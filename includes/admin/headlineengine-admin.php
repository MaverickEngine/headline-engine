<?php

class HeadlineEngineAdmin {

    function __construct() {
        add_action('admin_menu', [ $this, 'menu' ]);
        require_once('headlineengine-admin-settings.php' );
        new HeadlineEngineAdminSettings();
    }

    function menu() {
        add_menu_page(
            'HeadlineEngine',
			'HeadlineEngine',
			'manage_options',
			'headlineengine',
			null,
            "",
            30
        );
    }
}