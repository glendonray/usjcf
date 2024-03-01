<?php
/**
 * jcif functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package jcif
 */

if ( ! function_exists( 'jcif_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function jcif_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on jcif, use a find and replace
		 * to change 'jcif' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'jcif', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'jcif' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'jcif_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'jcif_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function jcif_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'jcif_content_width', 640 );
}
add_action( 'after_setup_theme', 'jcif_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function jcif_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'jcif' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'jcif' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'jcif_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function jcif_scripts() {
	wp_enqueue_style( 'jcif-style', get_stylesheet_uri() );

	wp_enqueue_style( 'tachyons', 'https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css' );

	wp_enqueue_style( 'fa', 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' );

	wp_enqueue_style( 'custom-jcif-style', get_template_directory_uri() . '/jcif-styles.css' );

	wp_enqueue_script( 'jcif-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'jcif-contact', get_template_directory_uri() . '/js/contact.js', array(), true );

	wp_enqueue_script( 'jcif-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'jcif_scripts', 999);

require_once WP_CONTENT_DIR . '/themes/jcif/shortcodes.php';
add_shortcode( 'board', 'board' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

add_action( 'template_redirect', 'board_redirect_post' );

function board_redirect_post() {
  $queried_post_type = get_query_var('post_type');
  $leadership_arc = get_post_type_archive_link( 'board_members' );
  if ( is_single() && 'board_members' ==  $queried_post_type ) {
    wp_redirect( $leadership_arc, 301 );
    exit;
  }
}


/**
 * Filter the except length to 20 words.
 *
 * @param int $length Excerpt length.
 * @return int (Maybe) modified excerpt length.
 */
function wpdocs_custom_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'wpdocs_custom_excerpt_length', 999 );

/**
 * Filter the excerpt "read more" string.
 *
 * @param string $more "Read more" excerpt string.
 * @return string (Maybe) modified "read more" excerpt string.
 */
function wpdocs_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );


add_image_size( 'card', 300, 150, true );
add_image_size( 'board', 300, 300, true );

function ran_color() {
	$colors = array('#3366cc','#13293d','#006494','#247ba0');
	echo $colors[array_rand($colors)];
}

//Shortcodes
require_once WP_CONTENT_DIR . '/themes/jcif/shortcodes.php';