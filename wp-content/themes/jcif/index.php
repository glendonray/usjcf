<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package jcif
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) :
				?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
				<?php
			endif;

			?>

			<div id="main-content" class="mw7 center pv3 ph4 mb5">
				<div class="center gc-header mt3 pb3 tc">
					<header class="entry-header">
						<h1 class="f1-ns mt0 mb3 lh-solid ttu">Blog</h1>
					</header>
				</div>

				<div class="b--black-10 bb mw5 center mb4"></div>

				<div class="flex flex-wrap">
			<?php

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();


				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				//get_template_part( 'template-parts/content', get_post_type() );
				?>
					<div class="gc-col-2 bg-fff br3 shadow-4 overflow-hidden card self-start">
						<a class="link" href="<?php the_permalink();?>">
							<?php if(has_post_thumbnail()){?>
			 	        	<div class="card-thumbnail">
			 	        		<?php the_post_thumbnail('card');?>
			 	        	</div>
			 	        	<?php } else {?>
			 	        		<div class="card-thumbnail" style="background-color:<?php ran_color();?>;">
			 	        		</div>
			 	        	<?php }?>
			 	        	<div class="card-content pa3">
					        	<h2 class="name mb0 f5 ttu navy"><?php the_title(); ?></h2>
					        	<div class="card-description f6"><?php
						if ( 'on' !== et_get_option( 'divi_blog_style', 'false' ) || ( is_search() && ( 'on' === get_post_meta( get_the_ID(), '_et_pb_use_builder', true ) ) ) ) {?>
							<p><?php truncate_post( 140 );?></p><?php
						} else {
							the_excerpt();
						}
						?></div>
				        	</div>
				        	<div class="mb0 mh3 pt2 bt b--black-10">
				        		<p class="ttu mont b blue tc f6 mb2">View Post</p>
				        	</div>
			        	</a>
					</div>

				<?php

			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>
				</div>
			</div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
//get_sidebar();
get_footer();
