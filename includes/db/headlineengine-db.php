<?php
class HeadlineEngineDB {
    public $posts_tablename;
    public $titles_tablename;

    public function __construct() {
        global $wpdb;
        $this->titles_tablename = $wpdb->prefix . "headlineengine_titles";
        $this->posts_tablename = $wpdb->prefix . "headlineengine_posts";
    }

    public function db_setup() {
        global $wpdb;
        $headlineengine_db_version = get_option("headlineengine_db_version", 0 );
        if ($headlineengine_db_version == HEADLINEENGINE_DB_VERSION) {
            return;
        }
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        $charset_collate = $wpdb->get_charset_collate();
        $headlineengine_posts_sql = "CREATE TABLE $this->posts_tablename (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            post_id mediumint(9) NOT NULL,
            user_id mediumint(9) NOT NULL,
            created datetime DEFAULT now() NOT NULL,
            updated datetime DEFAULT now() NOT NULL,
            start_at datetime DEFAULT NULL,
            end_at datetime DEFAULT NULL,
            time_to_run INT DEFAULT 0,
            active BOOLEAN DEFAULT false,
            UNIQUE KEY id (id),
            KEY post_id (post_id),
            KEY user_id (user_id),
            INDEX start_at (start_at),
            INDEX end_at (end_at),
            INDEX active (active),
            INDEX is_active (active, start_at, end_at)
        ) $charset_collate;";
        dbDelta( $headlineengine_posts_sql );
        
        $headlineengine_titles_sql = "CREATE TABLE $this->titles_tablename (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            post_id mediumint(9) NOT NULL,
            user_id mediumint(9) NOT NULL,
            created datetime DEFAULT now() NOT NULL,
            updated datetime DEFAULT now() NOT NULL,
            title TEXT NOT NULL,
            views INT DEFAULT 0,
            winner BOOLEAN DEFAULT false,
            score FLOAT DEFAULT 0,
            impressions INT DEFAULT 0,
            shares INT DEFAULT 0,
            UNIQUE KEY id (id),
            KEY post_id (post_id),
            KEY user_id (user_id),
            INDEX winner (winner),
            INDEX score (score),
            INDEX impressions (impressions),
            INDEX shares (shares)
        ) $charset_collate;";
        dbDelta( $headlineengine_titles_sql );

        update_option( "headlineengine_db_version", HEADLINEENGINE_DB_VERSION );
    }
}