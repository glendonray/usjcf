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

		/**
		 * Enqueue fonts. Add wp_enqueue_style lines above.
		 */
		wp_enqueue_style( 'gg-base-style', get_stylesheet_directory_uri() . '/dist/css/style.css', array(), '0.0.1' );

		/**
		 * Use latest jQuery.
		 */
		wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', get_stylesheet_directory_uri() . '/dist/js/jquery.min.js', array(), '3.4.1', false );
		wp_enqueue_script( 'jquery' );

		/**
		 * Enqueue scripts in head.
		 * This is a concatinated, minified file of scripts from ./src/js/head/
		 */
		wp_enqueue_script( 'ad-head', get_stylesheet_directory_uri() . '/dist/js/head.min.js', array(), '1.0', false );

		/**
		 * Enqueue scripts in footer.
		 * This is a concatinated, minified file of scripts from ./src/js/footer/
		 */
		wp_enqueue_script( 'ad-scripts', get_stylesheet_directory_uri() . '/dist/js/scripts.min.js', array(), '0.0.2', true );
	}
}

if ( ! function_exists( 'bt_enqueue_block_editor_assets' ) ) {
	/**
	 * Enqueue scripts and styles in admin.
	 */
	function bt_enqueue_block_editor_assets() {
		wp_enqueue_style( 'bt-editor-styles', get_stylesheet_directory_uri() . '/dist/css/editor-styles.css', null, '1.0' );
	}
}
add_action( 'enqueue_block_editor_assets', 'bt_enqueue_block_editor_assets' );

if ( ! function_exists( 'bt_override_mp6_tinymce_styles' ) ) {
	/**
	 * Add custom styles to ACF wysiwyg editor.
	 */
	function bt_override_mp6_tinymce_styles( $mce_init ) {

		// make sure we don't override other custom <code>content_css</code> files
		$content_css = get_template_directory_uri() . '/dist/css/editor-styles.css';
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