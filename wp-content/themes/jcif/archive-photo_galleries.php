<?php get_header(); ?>
<div id="main-content" class="mw7 center pv3 ph4">
	<div class="center gc-header mb3 mt3 pb3 tc">
		<header class="entry-header">
			<h1 class="f1-ns ma0 lh-solid ttu">Photo Galleries</h1>
		</header><!-- .entry-header -->
	</div>
	<div class="b--black-10 bb mw5 center mb4"></div>
	<div class="container">
		<div id="content-area" class="clearfix">
			<div class="flex flex-wrap">
			<?php
			if ( have_posts() ) :

				query_posts("{$query_string}&posts_per_page=-1");
		    	$wp_query->set( 'order', 'ASC');
		    	$wp_query->query($wp_query->query_vars);

				while ( have_posts() ) : the_post();
					$post_format = et_pb_post_format(); 
			?>
					
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'et_pb_post gc-col-3 bg-fff br3 shadow-4 overflow-hidden card' ); ?>>
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
				        	</div>
			        	</a>
					</article> <!-- .et_pb_post -->
			<?php
					endwhile;?>

					<?php

					if ( function_exists( 'wp_pagenavi' ) )
						wp_pagenavi();
					else
						get_template_part( 'includes/navigation', 'index' );
				else :
					get_template_part( 'includes/no-results', 'index' );
				endif;
			?>
			</div>
			
		</div> <!-- #content-area -->
	</div> <!-- .container -->
</div> <!-- #main-content -->

<?php

get_footer();
