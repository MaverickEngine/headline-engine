<?php

class HeadlineEngineAPI {
    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_api_routes' ) );
    }
    
    public function register_api_routes() {
        register_rest_route( 'headlineengine/v1', '/powerwords', array(
            'methods' => 'GET',
            'callback' => array( $this, 'powerwords' ),
            'permission_callback' => '__return_true'
        ) );
        register_rest_route( 'headlineengine/v1', '/suggest', array(
            'methods' => 'POST',
            'callback' => array( $this, 'suggest' ),
            'permission_callback' => '__return_true'
        ) );
    }

    public function powerwords() {
        $powerwords = get_option('headlineengine_powerwords_list', "");
        $powerwords = preg_replace("/[^A-Za-z0-9 \n]/", '', $powerwords);
        $powerwords = explode("\n", $powerwords);
        $powerwords = array_map('trim', $powerwords);
        $powerwords = array_filter($powerwords);
        $powerwords = array_unique($powerwords);
        $powerwords = array_values($powerwords);
        return $powerwords;
    }

    public function send_to_gpt($messages, $temperature=0.6) {
        // error_log(print_r($messages, true));
        $api_key = false;
        if (defined('OPENAI_APIKEY')) {
            $api_key = OPENAI_APIKEY;
        } else {
            $api_key = get_option('summaryengine_openai_apikey');
        }
        if (empty($api_key)) {
            return new WP_Error( 'headlineengine_no_summaryengine_apikey', 'SummaryEngine API key is not set', array( 'status' => 500 ) );
        }
        $summaryengine = new SummaryEngineChatGPT($api_key);
        $params = array(
            'model' => 'gpt-4o-mini',
            'messages' => $messages,
            'max_tokens' => 200,
            'temperature' => $temperature,
            'top_p' => 1,
            'frequency_penalty' => 0,
            'presence_penalty' => 0
        );
        return $summaryengine->summarise($params);
    }

    public function suggest( WP_REST_Request $request ) {
        // Check if SummaryEngine plugin is installed
        if (!class_exists('SummaryEngineChatGPT')) {
            return new WP_Error( 'headlineengine_no_summaryengine', 'SummaryEngine plugin is not installed', array( 'status' => 500 ) );
        }
        try {
            $content = $request->get_param("content");
            if (empty($content)) {
                return new WP_Error( 'headlineengine_no_content', 'Content is empty', array( 'status' => 400 ) );
            }
            $prompt = "Suggest three headlines for the following text. Do not give any explanation, just provide the headlines, one line at a time. Write in the style of Daily Maverick. Aim for around 14 words. Include powerwords. Aim it at an educated reader. Do not be overly dramatic. Vary the headlines.";
            $messages = array();
            $messages[] = ["role" => "system", "content" => "You are a Daily Maverick news editor. You write engaging headlines meeting the user needs of informing, educating, and entertaining the reader." ];
            $messages[] = ["role" => "user", "content" => "$prompt\n\n<start>$content<end>"];
            $response = $this->send_to_gpt($messages, 0.6);
            $messages[] = ["role" => "assistant", "content" => $response["choices"][0]["text"]];
            $messages[] = ["role" => "user", "content" => "Convert to standard case. Only capitalize the first letter of the first word and proper nouns. Remove any enclosing quotes."];
            $response = $this->send_to_gpt($messages, 0.1);
            $suggestions = explode("\n", $response["choices"][0]["text"]);
            $suggestions = array_map([$this, "clean_headline"], $suggestions);
            // Remove blanks and reindex the array
            $suggestions = array_values(array_filter($suggestions, function($suggestion) {
                return !empty($suggestion);
            }));
            return $suggestions;
        } catch (Exception $e) {
            return new WP_Error( 'headlineengine_error', $e->getMessage(), array( 'status' => 500 ) );
        }
    }

    function clean_headline($headline) {
        $headline = preg_replace("/^\d\.\s/", '', $headline);
        $headline = trim($headline);
        return $headline;
    }
}
