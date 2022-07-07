<?php

class HeadlineEnginePost {
    private function wpse_is_gutenberg_editor() { // https://wordpress.stackexchange.com/questions/309862/check-if-gutenberg-is-currently-in-use
        if( function_exists( 'is_gutenberg_page' ) && is_gutenberg_page() ) { 
            return true;
        }   
        
        $current_screen = get_current_screen();
        if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {
            return true;
        }
        return false;
    }

    public function __construct() {
        add_action('admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }

    public function enqueue_scripts() {
        if (!in_array(get_post_type(), get_option('headlineengine_post_types'))) {
            return false;
        }
        if ($this->wpse_is_gutenberg_editor()) {
            wp_enqueue_script( "headlineengine-post-script", plugin_dir_url(__FILE__) . "../../dist/headlineengine-gutenberg.js", [], HEADLINEENGINE_SCRIPT_VERSION, true );
            wp_enqueue_style( "headlineengine-post-style", plugin_dir_url(__FILE__) . "../../dist/headlineengine-gutenberg.css", [], HEADLINEENGINE_SCRIPT_VERSION );
        } else {
            wp_enqueue_script( "headlineengine-post-script", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.js", [], HEADLINEENGINE_SCRIPT_VERSION, true );
            wp_enqueue_style( "headlineengine-post-style", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.css", [], HEADLINEENGINE_SCRIPT_VERSION );
        }
        $script = "var headlineengine_readability_range_min = " . intval(get_option('headlineengine_readability_range_min', 45)) . ";";
        $script .= "var headlineengine_readability_target = " . intval(get_option('headlineengine_readability_target', 55)) . ";";
        $script .= "var headlineengine_readability_range_max = " . intval(get_option('headlineengine_readability_range_max', 90)) . ";";
        $script .= "var headlineengine_length_range_min = " . intval(get_option('headlineengine_length_range_min', 40)) . ";";
        $script .= "var headlineengine_length_target = " . intval(get_option('headlineengine_length_target', 82)) . ";";
        $script .= "var headlineengine_length_range_max = " . intval(get_option('headlineengine_length_range_max', 90)) . ";";
        $script .= "var headlineengine_powerwords_api = '" . get_rest_url( null, "/headlineengine/v1/powerwords") . "';";
        wp_add_inline_script('headlineengine-post-script', $script, 'before');
    }

}