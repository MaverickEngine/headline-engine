<div class="wrap">
    <form method="post" action="options.php">
        <?php settings_fields( 'headlineengine-settings-group' ); ?>
        <?php do_settings_sections( 'headlineengine-settings-group' ); ?>
        <h1><?php _e( 'HeadlineEngine Settings', 'headlineengine' ); ?></h1>
        <?php
            if (empty(get_option("headlineengine_powerwords_list", ""))) {
                echo '<div id="headlineengine_load_powerwords_container" class="error"><p>' . __("You have no powerwords set. Should we load a powerword list from <a href='https://rankmath.com/blog/power-words/' target='_blank'>RankMath</a>?</p><p><input id='headlineengine_load_powerwords' type='button' class='button' value='Load powerwords' />", "headlineengine") . '</p></div>';
            }
        ?>
        <?php settings_errors(); ?>
        <hr>
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row"><?php _e("Select post types", "headlineengine") ?></th>
                    <td>
                        <?php
                            $post_types = get_post_types(array('public' => true), 'objects');
                            foreach($post_types as $post_type) {
                                $checked = (get_option('headlineengine_post_types') && in_array($post_type->name, get_option('headlineengine_post_types'))) ? 'checked' : '';
                                echo '<input type="checkbox" name="headlineengine_post_types[]" value="' . esc_attr($post_type->name) . '" ' . $checked . '> ' . esc_html($post_type->label) . '<br>';
                            }
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php _e("Readability Score Targets", "headlineengine") ?></th>
                    <td>
                        <?php _e("Min", "headlineengine") ?>
                        <input type="number" name="headlineengine_readability_range_min" value="<?php esc_attr_e(get_option('headlineengine_readability_range_min', 45)) ?>">
                        <?php _e("Target", "headlineengine") ?>
                        <input type="number" name="headlineengine_readability_target" value="<?php esc_attr_e(get_option('headlineengine_readability_target', 55)) ?>">
                        <?php _e("Max", "headlineengine") ?>
                        <input type="number" name="headlineengine_readability_range_max" value="<?php esc_attr_e(get_option('headlineengine_readability_range_max', 90)) ?>">
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php _e("Character Count Targets", "headlineengine") ?></th>
                    <td>
                        <?php _e("Min", "headlineengine") ?>
                        <input type="number" name="headlineengine_length_range_min" value="<?php esc_attr_e(get_option('headlineengine_length_range_min', 40)) ?>" min="0">
                        <?php _e("Target", "headlineengine") ?>
                        <input type="number" name="headlineengine_length_target" value="<?php esc_attr_e(get_option('headlineengine_length_target', 82)) ?>" min="0">
                        <?php _e("Max", "headlineengine") ?>
                        <input type="number" name="headlineengine_length_range_max" value="<?php esc_attr_e(get_option('headlineengine_length_range_max', 90)) ?>" min="0">
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php _e("Powerwords", "headlineengine") ?></th>
                    <td>
                        <textarea id="headlineengine_powerwords_list" name="headlineengine_powerwords_list" rows="10" cols="50"><?php echo esc_textarea(get_option('headlineengine_powerwords_list', '')) ?></textarea>
                        <div><?php _e("Enter each powerword on a new line. Case is ignored.", "headlineengine") ?></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <?php submit_button(); ?>
    </form>
</div>