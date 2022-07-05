<?php
class HeadlineEnginePost {
    public function __construct() {
        add_action('edit_form_after_title', array( $this, 'edit_form_after_title' ) );
    }

    public function save_post( $post_id ) {
        global $wpdb;
        $post = get_post( $post_id );
        if ( $post->post_type != 'post' ) {
            return;
        }
    }

    public function delete_post( $post_id ) {
        global $wpdb;
        $wpdb->delete( $wpdb->prefix . "headlineengine_posts", array( 'post_id' => $post_id ) );
        $wpdb->delete( $wpdb->prefix . "headlineengine_titles", array( 'post_id' => $post_id ) );
    }

    public function edit_form_after_title() {
        if (!in_array(get_post_type(), get_option('headlineengine_post_types'))) {
            return false;
        }
        if (get_option('headlineengine_developer_mode')) {
            wp_enqueue_script( "headlineengine-post-script", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.js", [], HEADLINEENGINE_SCRIPT_VERSION, true );
            wp_enqueue_style( "headlineengine-post-style", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.css", [], HEADLINEENGINE_SCRIPT_VERSION );
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
        $script .= "var headlineengine_powerwords_api = '/wp-json/headlineengine/v1/powerwords';";
        wp_add_inline_script('headlineengine-post-script', $script, 'before');
    }

}