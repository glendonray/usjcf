<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jcif
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="icon" sizes="192x192" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.png">
	<meta name="theme-color" content="#3366cc">

	<?php wp_head(); ?>
	<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-55176570-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-55176570-3');
</script>

</head>

<body <?php body_class(); ?> id="gc">
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'jcif' ); ?></a>
<a href="/maui-wildfire-relief/#donate-maui" id="donate-banner" class="pa2 bg-navy justify-center no-underline dn">
	<div class="donate-content-wrapper flex justify-center">
		<div class="donate-text mr3 flex flex-column justify-center">
			<p class="b white mb0">Donate to Maui Relief</p>
		</div>
		<div class="donate-button">
			<span class="btn donate">Donate</span>
		</div>
	</div>
</a>
	<header id="masthead" class="site-header flex flex-wrap <?php 
	if (!is_front_page()){
		echo'bg-transparent not-home w-80-ns center mb4-m';
		} else {
		echo'bg-blue ';
		}
		?>">
		<div class="site-branding center-m center-s">
			<?php
			//the_custom_logo();
			if ( is_front_page() ) :
				?>
				<a href="/"><img src="/wp-content/uploads/2018/07/jcf_text_logo.png" alt="JCF logo light"></a>
				<h1 class="site-title home-h1"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<a href="/"><img src="/wp-content/uploads/2018/07/jcf-text-logo-dark.png" alt="JCF logo dark"></a>
				<!-- <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p> -->
				<?php
			endif;
			$jcif_description = get_bloginfo( 'description', 'display' );
			if ( $jcif_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $jcif_description; /* WPCS: xss ok. */ ?></p>
			<?php endif; ?>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="flex flex-wrap justify-center main-navigation ml-auto-ns w-auto w-100-m mr3-l mr3-m center">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php 
			esc_html_e( '', 'jcif' ); ?></button>
			<?php
			wp_nav_menu( array(
				'theme_location' => 'menu-1',
				'menu_id'        => 'primary-menu',
			) );
			?>
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="flex self-center donate-form">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="R7XUE7LGERQ3W">
				<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
				<button type="submit" class="btn donate" name="submit" alt="PayPal - The safer, easier way to pay online!">Donate</button>
				</form>
		</nav><!-- #site-navigation -->


	</header><!-- #masthead -->

	<div id="content" class="site-content">
