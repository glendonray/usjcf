<?php
/**
 * Enqueue child styles.
 */
function child_enqueue_styles() {
	wp_enqueue_style( 'jcif-child-theme', get_stylesheet_directory_uri() . '/style.css', array(), 100 );
}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles' );

/**
 * Reusable Blocks accessible in backend
 *
 * @link https://www.billerickson.net/reusable-blocks-accessible-in-wordpress-admin-area
 */
function gg_reusable_blocks_admin_menu() {
	add_menu_page( 'Patterns', 'Patterns', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
}
add_action( 'admin_menu', 'gg_reusable_blocks_admin_menu' );

/**
 * Include theme files.
 * Functions and hooks should go in these files, not in functions.php.
 */

 // Loop through inc files
foreach ( glob( get_theme_file_path() . '/inc/*.php' ) as $file ) {
	require $file;
}
