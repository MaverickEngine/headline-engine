<?php

class HeadlineEngineSetup {
    public $posts_tablename;
    public $titles_tablename;
    
    function __construct() {
        global $headlineengine_db;
        $headlineengine_db->db_setup();
    }

}