<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package jcif
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('mw7 center pv3'); ?>>
	<div class="center gc-header mb3 mt3 pb3 tc">
		<header class="entry-header">
			<h1 class="f1-ns mt0 mb3 lh-solid ttu"><?php the_title(); ?></h1>
			<?php

			if ( 'post' === get_post_type() ) :
				?>
				<div class="entry-meta">
					<?php
					jcif_posted_on();
					jcif_posted_by();
					?>
				</div><!-- .entry-meta -->
			<?php endif; ?>
			<?php

			if ( 'event' === get_post_type() ) :
				?>
				<div class="event-details">
					<?php
					$pid = get_the_ID();
					$location = get_post_meta($pid, 'location')[0];

					$date_meta = get_post_meta($pid, 'date');
			        $date = date('m/d/Y', strtotime($date_meta[0]));
			        if(!empty($end_d_meta[0])){$end_d = date('m/d/Y', strtotime($end_d_meta[0]));
			    	} 
					?>
					<p class="b tc f3 mt2 mb0"><?php echo $date;
					if(!empty($end_d_meta[0])){
						echo ' - '.$end_d;
					}?> | <?php echo $location?></p>
				</div><!-- .entry-meta -->
			<?php endif; ?>

		</header><!-- .entry-header -->
	</div>
	<div class="b--black-10 bb mw5 center mb4"></div>

	<?php if(! is_singular('photo_galleries')){jcif_post_thumbnail();} ?>

	<div class="entry-content ph4">
		<?php
		the_content( sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'jcif' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			get_the_title()
		) );

		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'jcif' ),
			'after'  => '</div>',
		) );
		?>
	</div><!-- .entry-content -->

<!-- 	<footer class="entry-footer">
		<?php //jcif_entry_footer(); ?>
	</footer> --><!-- .entry-footer -->
		<?php
			$pt = get_post_type();
		?>
		<div class="back pa2 tc mb4">
			<a href="<?php echo get_post_type_archive_link($pt);?>" class="btn link">All <?php echo get_post_type_object($pt)->label;?></a>
		</div>
</article><!-- #post-<?php the_ID(); ?> -->

<div class="btt fixed bg-blue white br-100 pa2 tc flex items-center shadow-4"><a class="white center" href="#masthead"><i class="fas fa-arrow-up"></i></a></div>