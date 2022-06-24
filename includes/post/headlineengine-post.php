<?php
class HeadlineEnginePost {
    public function __construct() {
        add_action( 'save_post', array( $this, 'save_post' ) );
        add_action( 'delete_post', array( $this, 'delete_post' ) );
        // Editing post
        add_action( 'admin_action_edit', array( $this, 'edit_post' ) );
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

    public function edit_post( ) {
        global $wpdb;
        // $post = get_post( $post_id );
        // print_r($post_id);
        // die();
        // if ( $post->post_type != 'post' ) {
        //     return;
        // }
        // $wpdb->update( $wpdb->prefix . "headlineengine_posts", array( 'active' => false ), array( 'post_id' => $post_id ) );
        // $wpdb->update( $wpdb->prefix . "headlineengine_titles", array( 'active' => false ), array( 'post_id' => $post_id ) );
    }

    public function edit_form_after_title( ) {
        global $wpdb;
        if (!in_array(get_post_type(), get_option('headlineengine_post_types'))) {
            return false;
        }
        if (get_option('headlineengine_developer_mode')) {
            wp_enqueue_script( "headlineengine-post-script", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.js", [], "0.0.1", true );
            wp_enqueue_style( "headlineengine-post-style", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.css", [], "0.0.1" );
        } else {
            wp_enqueue_script( "headlineengine-post-script", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.js", [], "0.0.1", true );
            wp_enqueue_style( "headlineengine-post-style", plugin_dir_url(__FILE__) . "../../dist/headlineengine-post.css", [], "0.0.1" );
        }
        $script = "var headlineengine_readability_range_min = " . intval(get_option('headlineengine_readability_range_min', 45)) . ";";
        $script .= "var headlineengine_readability_range_max = " . intval(get_option('headlineengine_readability_range_max', 90)) . ";";
        $script .= "var headlineengine_length_range_min = " . intval(get_option('headlineengine_length_range_min', 40)) . ";";
        $script .= "var headlineengine_length_range_max = " . intval(get_option('headlineengine_length_range_max', 90)) . ";";
        $script .= "var headlineengine_powerwords_list = `" . preg_replace("/[^A-Za-z0-9 \n]/", '', get_option('headlineengine_powerwords_list', "")) . "`;";
        wp_add_inline_script('headlineengine-post-script', $script, 'before');
        print "<div id='headlineengine-score-container'></div>";
    }

}