<?php
/**
 * Any support functions unique to this site should be added here, if not in a plugin.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Basetheme
 * @since 1.0
 * @version 1.0
 */

// Functions for Terms Posts Block AJAX request - Referenced in atmdst-child/src/js/blocks/atomic-posts/atomic-posts.js
function filter_atomic_posts() {
	$default_post_type    = $_POST['postType'];
	$filter_term    = $_POST['filterTerm'];
	$filter_tax     = $_POST['filterTax'];
	$default_terms = $_POST['defaultTerms'];
	$default_taxes  = $_POST['defaultTaxes'];
	$default_tax_query  = json_decode( html_entity_decode( stripslashes ($_POST['defaultTaxQuery'])), true);
	$max_pages    = $_POST['maxPages'];
	$search_value = $_POST['searchValue'];
	$has_tax_query = $_POST['hasTaxQuery'];
	$post_count = $_POST['postCount'];
	$enable_link = $_POST['enableLink'];

	if (1 == $has_tax_query && $filter_term != 'all') :
		//Append Filter variables to Tax Query Array
		$default_tax_query[] = [
			'taxonomy' => $filter_tax,
			'field'    => 'slug',
			'terms'    => $filter_term,
		];
	endif;


	$all_terms = wp_list_pluck(
		get_terms(
			array(
				'taxonomy'   => $filter_tax,
				'hide_empty' => 'false',
			)
		),
		'slug'
	);

	if ( $filter_term == 'all' ) :
		$filter_term = $all_terms;
	endif;

	$ajaxposts  = new WP_Query(
		array(
			'post_type'      => $default_post_type,
			'posts_per_page' => -1,
			'order'          => 'DESC',
			's'              => $search_value,
			'tax_query' => $default_tax_query
			
			// 'tax_query'      => array(
			// 	'relation' => 'AND',
			// 	array(
			// 		'taxonomy' => $filter_tax,
			// 		'field'    => 'slug',
			// 		'terms'    => $filter_term,
			// 	),
			// 	array(
			// 		'taxonomy' => $default_taxes,
			// 		'field'    => 'slug',
			// 		'terms'    => $default_terms,
			// 	),
			// ),
		)
	);

	$max_pages  = $ajaxposts->max_num_pages;
	$posts_found = $ajaxposts->found_posts;
	$post_data  = array();
	if ( $ajaxposts->have_posts() ) :
		while ( $ajaxposts->have_posts() ) :
			$ajaxposts->the_post();
			ob_start();
			get_template_part(
				'template-parts/blocks/part',
				'atomic-posts-article',
				['enable_link' => $enable_link]
			);
			$output = ob_get_contents();
			array_push( $post_data, $output );
			ob_end_clean();
		endwhile;
	else :
			ob_start(); ?>
			<div class="no-results">
				<?php echo 'There are no ' . get_term_by( 'slug', $filter_term, $filter_tax )->name . ' articles with the ' . get_taxonomy( $default_taxes )->labels->singular_name . ' ' . get_term_by( 'slug', $default_terms, $default_taxes )->name;
				if (!empty( $search_value)) :
				echo ', with the search term "' .  $search_value . '".';
				else :
					echo '.';
				endif;
				?>
			</div>
			<?php
			$output = ob_get_contents();
			array_push( $post_data, $output );
			ob_end_clean();
	endif;

	$result = array(
		'max_pages'  => $max_pages,
		'post_count' => $posts_found,
		'post_data'  => $post_data,
		'debug'=> $enable_link
	);

	echo json_encode( $result );
	wp_reset_postdata();
	exit;
}
add_action( 'wp_ajax_filter_atomic_posts', 'filter_atomic_posts' );
add_action( 'wp_ajax_nopriv_filter_atomic_posts', 'filter_atomic_posts' );

// ACF Google Maps API Key
// $acf_gmap_key = get_field('google_maps_api_key', 'option');
// if($acf_gmap_key) :
	function ad_acf_init() {
		acf_update_setting('google_api_key', get_field('google_maps_api_key', 'option'));
	}
	add_action('acf/init', 'ad_acf_init');
// endif;

/**
 * Reusable Blocks accessible in backend
 *
 * @link https://www.billerickson.net/reusable-blocks-accessible-in-wordpress-admin-area
 */
function ad_reusable_blocks_admin_menu() {
	add_menu_page( 'Patterns', 'Patterns', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
}
add_action( 'admin_menu', 'ad_reusable_blocks_admin_menu' );

/**
 * Custom Query Args for Kadence Query Loops
 * @link https://www.kadencewp.com/help-center/docs/kadence-blocks/custom-queries-for-advanced-query-loop-block/
 */
add_filter( 'kadence_blocks_pro_query_loop_query_vars', function( $query, $ql_query_meta, $ql_id ) {
	// Single Missionary - From the Field (PID: 1032),  Program Partnerships (PID: 1037)
	if ( $ql_id == 1032 || $ql_id == 1037 ) :
	   $query['meta_query'] = array(
		  array(
			 'key' => 'associated_missionary',
			 'value' => get_the_id(),
			 'compare' => 'LIKE',
		  )
	   );
	endif;

	// Single Program - Meet the Local Team (PID: 4651), Single Special Project - About the Missionary (PID: 4761)
	if ( $ql_id == 4651 || $ql_id == 4761) :
		$query['post__in'] = get_field('associated_missionary',get_the_id()); 
		endif;
	return $query;
 }, 10, 3 );


 add_filter('the_content', 'wphelp_remove_shortcodes_divi');
function wphelp_remove_shortcodes_divi( $content ) {
$content = preg_replace('/\[\/?et_pb.*?\]/', '', $content);
return $content;
}




comment_form(
	array(
		'logged_in_as'       => null,
		'title_reply'        => esc_html__( 'Subnit a reply', 'atmdst-child' ),
		'title_reply_before' => '<h2 id="reply-title" class="comment-reply-title">',
		'title_reply_after'  => '</h2>',
	)
);