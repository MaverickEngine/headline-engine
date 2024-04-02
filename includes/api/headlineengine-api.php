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

    public function suggest( WP_REST_Request $request ) {
        // Check if SummaryEngine plugin is installed
        if (!class_exists('SummaryEngineChatGPT')) {
            return new WP_Error( 'headlineengine_no_summaryengine', 'SummaryEngine plugin is not installed', array( 'status' => 500 ) );
        }
        $api_key = false;
        if (defined('OPENAI_APIKEY')) {
            $api_key = OPENAI_APIKEY;
        } else {
            $api_key = get_option('summaryengine_openai_apikey');
        }
        if (empty($api_key)) {
            return new WP_Error( 'headlineengine_no_summaryengine_apikey', 'SummaryEngine API key is not set', array( 'status' => 500 ) );
        }
        $content = $request->get_param("content");
        if (empty($content)) {
            return new WP_Error( 'headlineengine_no_content', 'Content is empty', array( 'status' => 400 ) );
        }
        $summaryengine = new SummaryEngineChatGPT($api_key);
        $prompt = "Suggest three headlines for the following text. Do not give any explanation, just provide the headlines, one line at a time. Write in the style of Daily Maverick. Aim for around 14 words. Include powerwords. Aim it at an educated reader. Do not be overly dramatic. Vary the headlines. Use regular case.\n\nExamples:\nGone for good — dwindling number of South African emigrants return\nSpeaker’s corruption saga another nail in coffin of public trust in government\nMiddle East bulk animal carrier Al Messilah’s pre-arrival in East London sparks outcry over livestock export\n\n" . $content;
        $messages = array();
        $messages[] = ["role" => "system", "content" => "You are a Daily Maverick news editor. You write engaging headlines meeting the user needs of informing, educating, and entertaining the reader." ];
        $messages[] = ["role" => "user", "content" => $prompt];
        $params = array(
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
            'max_tokens' => 200,
            'temperature' => 0.6,
            'top_p' => 1,
            'frequency_penalty' => 0,
            'presence_penalty' => 0
        );
        $response = $summaryengine->summarise($params);
        $suggestions = explode("\n", $response["choices"][0]["text"]);
        $suggestions = array_map([$this, "clean_headline"], $suggestions);
        return $suggestions;
    }

    function clean_headline($headline) {
        $headline = preg_replace("/^\d\.\s/", '', $headline);
        $headline = trim($headline);
        return $headline;
    }
}
