<?php
/**
 * Atomic Posts Block template.
 *
 * @param array $block The block settings and attributes.
 */

$block_id = 'atomic-posts-' . $block['id'];

// Support custom "anchor" values.
$anchor = '';
if ( ! empty( $block['anchor'] ) ) {
	$anchor = 'id="' . esc_attr( $block['anchor'] ) . '" ';
}

// Create class attribute allowing for custom "className" and "align" values.
$class_name = 'atomic-posts-block';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
	$class_name .= ' align' . $block['align'];
}

// // // // //
// Query Options
// // // // //
$ajax_url = admin_url('admin-ajax.php');
$ajax_nonce = wp_create_nonce('atomic_posts_ajax_nonce');

// ACF Fields for Building the Query
$default_post_type = get_field('atomic_posts_post_type');
$default_post_terms = get_field( 'atomic_posts_terms' );

// How many posts we want to display
$post_count = get_field('atomic_posts_count');

// Relation Comparison between Default Posts Terms
$and_or = get_field('atomic_posts_and_or');

// Empty array to be populate with our Tax Query Parameters
$tax_query_array = [];

// Variable to help identify if we have terms(a tax_query) to filter our default posts by
$has_tax_query = '';

if($default_post_terms) :
	$has_tax_query = 1;
	$tax_query_array = ['relation'=>$and_or];
	// echo '<h4>You are viewing:</h4><ul>';
	foreach ($default_post_terms as $default_term) :
		$tax_query_array[] = [
			'taxonomy'=>$default_term->taxonomy, 
			'field'=>'slug', 
			'terms'=>$default_term->slug,
		];
		// echo '<li>'.$default_term->taxonomy.' : '.$default_term->name.'</li>';
	endforeach;
	//echo '</ul>';
else :
	$has_tax_query = 0;
endif;

//ACF Fields for Display Options
$show_author = get_field('atomic_posts_show_author');

// // // // //
// Filter Options
// // // // //

// Display Filter?
$display_filter = get_field('atomic_posts_display_filter');

// Filter Options
$filter_tax = get_field('atomic_posts_taxonomy_filter')->name;

// // // // //
// Pagination Options
// // // // //

// Display Pagiantion?
$display_pagination = get_field('atomic_posts_display_pagination');

// Variables to use if we're inheriting the term form the pages built in query.
// $term_id   = get_queried_object()->term_id;
// $term_name = get_queried_object()->name;
// $term_slug = get_queried_object()->slug;
// $term_tax  = get_queried_object()->taxonomy;


$enable_link = get_field('atomic_posts_link_to_post');

$args = array(
	'post_type'      => $default_post_type,
	'post_status'    => 'publish',
	'order'          => 'DESC',
	'posts_per_page' => -1,
	// 'posts_per_page' => $post_count,
	'tax_query'      => $tax_query_array
);

// The Query.
$query  = new WP_Query( $args );
$posts_found = $query->found_posts;
$max_pages  = $query->max_num_pages;

// The Loop.
if ( $query->have_posts() ) :
?>
<div id="<?php echo esc_html( $block_id ); ?>" data-bid="<?php echo esc_html( $block_id ); ?>" <?php echo esc_attr( $anchor ); ?>class="<?php echo esc_attr( $class_name ); ?>" data-enable-link="<?php echo $enable_link;?>" data-post-type="<?php echo $default_post_type;?>" data-has-tax-query="<?php echo $has_tax_query;?>" data-default-tax-query="<?php echo htmlspecialchars(json_encode($tax_query_array), ENT_QUOTES, 'UTF-8');?>" data-post-count="<?php echo $post_count;?>" data-ajax-url="<?php echo $ajax_url;?>" data-ajax-nonce="<?php echo $ajax_nonce;?>">
	<div class="filter-wrapper atomic-posts-filter" <?php echo (1 != $display_filter) ? 'hidden' : ''; ?> data-filter-tax="<?php echo $filter_tax; ?>" data-filter-term="all">
		<div class="filter">
			<div class="filter-label-wrapper">
				<div class="filter-label">
					Filter by:
				</div>
			</div>
			<?php
			$f_terms = get_terms( $filter_tax );
			?>
			<div class="filter-list-wrapper">
				<ul class="filter-list">
					<li class="filter-item active">
						<a class="filter-link active" href="#!"  data-term="none" data-tax="<?php echo $filter_tax; ?>">Select a <?php echo get_taxonomy( $filter_tax )->labels->singular_name; ?></a>
					</li>
					<li class="filter-item">
						<a class="filter-link active" id="all-terms" href="#!"  data-term="all" data-tax="<?php echo $filter_tax; ?>">All <?php echo get_taxonomy( $filter_tax )->label; ?></a>
					</li>
					<?php
					foreach ( $f_terms as $f_term ) :
						$ft_id   = $f_term->term_id;
						$ft_name = $f_term->name;
						$ft_slug = $f_term->slug;
						?>
						<li class="filter-item" >
							<a class="filter-link" href="#!" data-term="<?php echo $ft_slug; ?>" data-tax="<?php echo $filter_tax; ?>">
							<?php echo $ft_name; ?>
							</a>
						</li>
						<?php
					endforeach;
					?>
				</ul>
			</div>
			<div class="atomic-posts-search-form-wrapper">
				<form class="atomic-posts-search-form" onsubmit="return false">
						<label class="screen-reader-text" for="atomic-posts-search">Search</label>
						<input class="atomic-posts-search" placeholder="Search" value="" name="atomic-posts-search" required="" type="search" placeholder="Search">
						<button aria-label="Search" hidden class="atomic-posts-search-button" type="submit">Search</button>
				</form>
			</div>
			<div class="filter-loader-wrapper">
				<div class="filter-loader">
				<p class="screen-reader-text">Loading results...</p>
				<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="#00587d">
					<g fill="none" fill-rule="evenodd">
						<g transform="translate(1 1)" stroke-width="2">
							<circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
							<path d="M36 18c0-9.94-8.06-18-18-18">
								<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
							</path>
						</g>
					</g>
				</svg>
				</div>
			</div>
		</div>
	</div>
	<?php

// // // // //
// Display Options
// // // // //
$column_count = get_field('atomic_posts_columns');

	?>
	<div class="atomic-posts-wrapper">
		<div class="atomic-posts ad-<?php echo $column_count;?>" data-posts-found="<?php echo $posts_found; ?>">
		<?php
		while ( $query->have_posts() ) :
			$query->the_post();
			get_template_part( 
				'template-parts/part',
				'atomic-posts-article',
				['enable_link' => $enable_link]
			);
		endwhile;
		?>
		</div>
	</div>
	<div class="atomic-posts-pagination-wrapper" <?php echo (1 != $display_pagination) ? 'hidden' : ''; ?>>
	</div>
</div>
	<?php
// echo '<pre>';
// print_r($query);
// echo '</pre>';
	wp_reset_postdata();
elseif($post_count < 1) :
	?><p>There are no posts with these parameters.</p><?php
elseif ( is_admin() ) :
	?>
<p><em><?php esc_attr_e( 'Please select post display options.', 'ad' ); ?></em></p>
<?php endif; ?>
