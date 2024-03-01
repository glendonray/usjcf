<?php
/**
 * Enqueue child styles.
 */
function child_enqueue_styles() {
	wp_enqueue_style( 'jcif-child-theme', get_stylesheet_directory_uri() . '/style.css', array(), 100 );
}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles' );

/**
 * Include theme files.
 * Functions and hooks should go in these files, not in functions.php.
 */

/* Setup menus, sidebars, scripts, etc. */
require get_theme_file_path() . '/lib/theme-setup.php';

/* Misc hooks and functions more specific to this site */
require get_theme_file_path() . '/lib/theme-functions.php';

/* Register theme ACF blocks */
require get_theme_file_path() . '/lib/theme-acfblocks.php';

/**
 * Clean Divi shortcodes from content Post.
 *
 * NOTE: Only for migrate from Divi to Gutenberg. Deactivate it after that.
 *
 * @param string $content The post content.
 *
 * @return string
 */ 
function gg_save_clean_content( $content ) { 
    return preg_replace( '/\[\/?et_pb.*?\]/', '', $content );
 }
 add_filter( 'content_save_pre', 'gg_save_clean_content', 10, 1 ); 