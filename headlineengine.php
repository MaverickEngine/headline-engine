<?php
/**
* Plugin Name: HeadlineEngine
* Plugin URI: https://github.com/MaverickEngine/headline-engine
* Description: What makes a good headline? Get instant headline analysis based on readability, length, and powerwords. Brought to you by MavEngine, &lt;em&gt;Powering Media. 
* Author: MavEngine
* Author URI: https://mavengine.com
* Version: 0.0.2
* License: GPLv2 or later
* License URI: https://www.gnu.org/licenses/gpl-3.0.html
* WC requires at least: 5.8.0
* Tested up to: 5.8.2
*
*/
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const HEADLINEENGINE_DB_VERSION = 0.4;
const HEADLINEENGINE_SCRIPT_VERSION = "0.0.2";

require_once( plugin_dir_path( __FILE__ ) . 'includes/db/headlineengine-db.php' );
$headlineengine_db = new HeadlineEngineDB();

function headlineengine_admin_init() {
    if (!is_admin()) {
        return;
    }
    // require_once(plugin_dir_path( __FILE__ ) . 'includes/admin/taxonomyengine-scripts.php' );
    require_once(plugin_basename('includes/admin/headlineengine-admin.php' ) );
    new HeadlineEngineAdmin([]);
}
add_action( 'init', 'headlineengine_admin_init' );

// function taxonomy_engine_navigation_init() {
//     require_once(plugin_basename('includes/navigation/taxonomyengine-navigation.php' ) );
//     $taxonomyengine_globals["taxonomyengine_navigation"] = new TaxonomyEngineNavigation($taxonomyengine_globals);
// }
// add_action( 'init', 'taxonomy_engine_navigation_init', 2);

// function taxonomy_engine_frontend_init() {
//     require_once( plugin_dir_path( __FILE__ ) . 'includes/frontend/taxonomyengine-frontend-reviewer.php' );
//     new TaxonomyEngineFrontendReviewer([]);
// }
// add_action( 'init', 'taxonomy_engine_frontend_init', 3 );

// function taxonomy_engine_api_init() {
//     require_once(plugin_basename('includes/api/taxonomyengine-api.php' ) );
//     new TaxonomyEngineAPI([]);
// }
// add_action( 'init', 'taxonomy_engine_api_init');

function headlineengine_common_init() {
    require_once( plugin_dir_path( __FILE__ ) . 'includes/headlineengine-setup.php' );
    new HeadlineEngineSetup();
}
add_action( 'admin_init', 'headlineengine_common_init', 2 );

function headlineengine_post_init() {
    require_once( plugin_dir_path( __FILE__ ) . 'includes/post/headlineengine-post.php' );
    new HeadlineEnginePost();
}
add_action( 'admin_init', 'headlineengine_post_init', 3 );