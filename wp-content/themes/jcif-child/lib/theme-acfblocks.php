<?php
/**
 * Register ACF blocks
 */
function gg_register_acf_blocks() {
    /**
     * We register our block's with WordPress's handy
     * register_block_type();
     *
     * @link https://developer.wordpress.org/reference/functions/register_block_type/
     */
    // register_block_type( get_stylesheet_directory() . '/blocks/atomic-posts' );
    // register_block_type( get_stylesheet_directory() . '/blocks/atomic-globe' );
    // register_block_type( get_stylesheet_directory() . '/blocks/atomic-donations' );
    // register_block_type( get_stylesheet_directory() . '/blocks/messenger-category-link' );
}
add_action( 'init', 'gg_register_acf_blocks' );


// Adding a new (custom) block category and show that category at the top
// add_filter( 'block_categories_all', 'ad_custom_block_category', 10, 2);
// function ad_custom_block_category( $categories, $post ) {
	
// 	array_unshift( $categories, array(
// 		'slug'	=> 'atomicdust',
// 		'title' => 'Atomicdust'
// 	) );

// 	return $categories;
// }
