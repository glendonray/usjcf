<?php get_header(); ?>
<div id="main-content" class="mw7 center pv3 ph4">
	<div class="center gc-header mb3 mt3 pb3 tc">
		<header class="entry-header">
			<h1 class="f1-ns ma0 lh-solid ttu">Board Members</h1>
		</header><!-- .entry-header -->
	</div>
	<div class="b--black-10 bb mw5 center mb4"></div>
	<div class="container">
		<div id="content-area" class="clearfix">
			<p>The U.S. Jaycees Foundation Board is constantly striving to build upon our mission of providing financial support for The U.S. Junior Chamber and its member organizations programs and activities for the purpose of leadership development and growth. The Foundation has been able to give back to the Jaycee organization through local chapter grants and financing The U.S. Junior Chamber training programs.
			</p>
			<div class="flex flex-wrap">
			<?php
			if ( have_posts() ) :

				query_posts("{$query_string}&posts_per_page=-1");
		    	$wp_query->set( 'order', 'ASC');
		    	$wp_query->query($wp_query->query_vars);

				while ( have_posts() ) : the_post();
					$post_format = et_pb_post_format(); 


			$pid = get_the_id();
			$position = get_post_meta($pid, 'position')[0];
			$location = get_post_meta($pid, 'location')[0];
			$email = get_post_meta($pid, 'email')[0];
			?>
					
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'et_pb_post gc-col-3 bg-fff br3 shadow-4 overflow-hidden card' ); ?>>							<?php if(has_post_thumbnail()){?>
			 	        	<div class="card-thumbnail">
			 	        		<?php the_post_thumbnail('board');?>
			 	        	</div>
			 	        	<?php } else {?>
			 	        		<div class="card-thumbnail" style="background-color:<?php ran_color();?>;">
			 	        		</div>
			 	        	<?php }?>
		 	        	<div class="member-info pa3">
				        	<h2 class="name mb0 f5 ttu"><?php the_title(); ?></h2>
				        	<p class="i f6 mb1"><?php echo $position?></p>
				        	<p class="mt0"><?php echo $location?></p>
				        	<?php //if(!empty($email)){ 
								//echo '<p class="email mb0"><a href="mailto:' . $email . '" class="link teal"><i class="fas fa-envelope"></i> Email</a></p>';
							//} ?>
			        	</div>
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
