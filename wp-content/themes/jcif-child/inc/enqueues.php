<?php
/**
 * This file contains theme setup such as enqueing, etc.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage JCIF Child
 * @since 1.0
 * @version 1.0
 */

if ( ! function_exists( 'gg_enqueue' ) ) {
	/**
	 * Enqueue scripts and styles.
	 */
	function gg_enqueue() {
		$theme_dir = get_stylesheet_directory();
		$theme_uri = get_stylesheet_directory_uri();

		$asset = file_exists( "$theme_dir/build/frontend.asset.php" )
			? include "$theme_dir/build/frontend.asset.php"
			: array( 'dependencies' => array(), 'version' => '1.0.0' );

		wp_enqueue_style( 'gg-base-style', "$theme_uri/build/frontend.css", array(), $asset['version'] );

		$deps = array_merge( $asset['dependencies'], array( 'jquery' ) );
		wp_enqueue_script( 'gg-scripts', "$theme_uri/build/frontend.js", $deps, $asset['version'], true );
	}
}

if ( ! function_exists( 'gg_enqueue_block_editor_assets' ) ) {
	/**
	 * Enqueue editor styles in the block editor.
	 */
	function gg_enqueue_block_editor_assets() {
		$theme_dir = get_stylesheet_directory();
		$theme_uri = get_stylesheet_directory_uri();

		$asset = file_exists( "$theme_dir/build/editor.asset.php" )
			? include "$theme_dir/build/editor.asset.php"
			: array( 'version' => '1.0.0' );

		wp_enqueue_style( 'gg-editor-styles', "$theme_uri/build/editor.css", array(), $asset['version'] );
	}
}

add_action( 'wp_enqueue_scripts', 'gg_enqueue' );
add_action( 'enqueue_block_editor_assets', 'gg_enqueue_block_editor_assets' );
