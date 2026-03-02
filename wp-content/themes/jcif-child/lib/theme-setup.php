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

		/**
		 * Main theme stylesheet — compiled from src/scss/style.scss via wp-scripts.
		 * Version is a content hash from the generated .asset.php file.
		 */
		$style_asset = file_exists( "$theme_dir/build/style.asset.php" )
			? include "$theme_dir/build/style.asset.php"
			: array( 'version' => '1.0.0' );
		wp_enqueue_style( 'gg-base-style', "$theme_uri/build/style.css", array(), $style_asset['version'] );

		/**
		 * Head scripts (e.g. Popper) — loaded before page content.
		 */
		$head_asset = file_exists( "$theme_dir/build/head.asset.php" )
			? include "$theme_dir/build/head.asset.php"
			: array( 'dependencies' => array(), 'version' => '1.0.0' );
		wp_enqueue_script( 'ad-head', "$theme_uri/build/head.js", $head_asset['dependencies'], $head_asset['version'], false );

		/**
		 * Footer scripts — loaded at bottom of page. Requires jQuery (bundled with WordPress).
		 */
		$scripts_asset = file_exists( "$theme_dir/build/scripts.asset.php" )
			? include "$theme_dir/build/scripts.asset.php"
			: array( 'dependencies' => array(), 'version' => '1.0.0' );
		$scripts_deps = array_merge( $scripts_asset['dependencies'], array( 'jquery' ) );
		wp_enqueue_script( 'ad-scripts', "$theme_uri/build/scripts.js", $scripts_deps, $scripts_asset['version'], true );
	}
}

if ( ! function_exists( 'bt_enqueue_block_editor_assets' ) ) {
	/**
	 * Enqueue editor styles in the block editor.
	 */
	function bt_enqueue_block_editor_assets() {
		$theme_dir   = get_stylesheet_directory();
		$theme_uri   = get_stylesheet_directory_uri();
		$asset       = file_exists( "$theme_dir/build/editor-styles.asset.php" )
			? include "$theme_dir/build/editor-styles.asset.php"
			: array( 'version' => '1.0.0' );
		wp_enqueue_style( 'bt-editor-styles', "$theme_uri/build/editor-styles.css", array(), $asset['version'] );
	}
}
add_action( 'enqueue_block_editor_assets', 'bt_enqueue_block_editor_assets' );

if ( ! function_exists( 'bt_override_mp6_tinymce_styles' ) ) {
	/**
	 * Add custom styles to ACF wysiwyg editor.
	 */
	function bt_override_mp6_tinymce_styles( $mce_init ) {

		// make sure we don't override other custom <code>content_css</code> files
		$content_css = get_stylesheet_directory_uri() . '/build/editor-styles.css';
		if ( isset( $mce_init['content_css'] ) ) {
			$content_css .= ',' . $mce_init['content_css'];
		}

		$mce_init['content_css'] = $content_css;

		return $mce_init;
	}
	add_filter( 'tiny_mce_before_init', 'bt_override_mp6_tinymce_styles' );
}

add_action( 'wp_enqueue_scripts', 'gg_enqueue' );

// Custom Image Sizes
add_image_size( 'square', 360, 360, true ); // 220 pixels wide by 180 pixels tall, soft proportional crop mode

// Allow SVG
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

	global $wp_version;
	if ( $wp_version !== '4.7.1' ) {
	   return $data;
	}
  
	$filetype = wp_check_filetype( $filename, $mimes );
  
	return [
		'ext'             => $filetype['ext'],
		'type'            => $filetype['type'],
		'proper_filename' => $data['proper_filename']
	];
  
  }, 10, 4 );
  
  function cc_mime_types( $mimes ){
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
  }
  add_filter( 'upload_mimes', 'cc_mime_types' );
  
  function fix_svg() {
	echo '<style type="text/css">
		  .attachment-266x266, .thumbnail img {
			   width: 100% !important;
			   height: auto !important;
		  }
		  </style>';
  }
  add_action( 'admin_head', 'fix_svg' );