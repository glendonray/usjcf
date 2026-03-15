<?php
/**
 * GenerateProp Block Registration
 *
 * Handles registration of custom blocks, ACF blocks, and the block category.
 */

/**
 * Register GenerateProp block category
 * Note: This works together with registerBlockCollection() in JS.
 * The category places blocks in the inserter, the collection adds branding/icon.
 */
function gg_add_block_category( $block_categories ) {
	// Add our category at the beginning of the list
	array_unshift($block_categories, [
		'slug'  => 'USJCF Blocks',
		'title' => __( 'USJCF Blocks', 'gg' ),
	]);
	return $block_categories;
}
add_filter( 'block_categories_all', 'gg_add_block_category' );

// Register build blocks (for webpack-built blocks)
function gg_register_build_blocks() {
	// Use get_stylesheet_directory() for child themes (not get_template_directory())
	$blocks_dir = get_stylesheet_directory() . '/build/blocks';
	if ( is_dir( $blocks_dir ) ) {
		foreach ( glob( $blocks_dir . '/*', GLOB_ONLYDIR ) as $block_dir ) {
			register_block_type( $block_dir );
		}
	}
}
add_action( 'init', 'gg_register_build_blocks' );

/**
 * Gravity Forms: Register metaFormField attribute server-side.
 *
 * The block-renderer REST API endpoint validates attributes against the PHP-registered
 * schema. Without this, sending metaFormField from the editor causes a 400 error
 * ("Invalid parameter(s): attributes") that breaks existing GF blocks in the editor.
 */
add_filter( 'register_block_type_args', function( $args, $block_type ) {
	if ( $block_type !== 'gravityforms/form' ) {
		return $args;
	}
	if ( ! isset( $args['attributes'] ) ) {
		$args['attributes'] = array();
	}
	$args['attributes']['metaFormField'] = array(
		'type'    => 'string',
		'default' => '',
	);
	return $args;
}, 10, 2 );

/**
 * Gravity Forms: Populate form from post meta field at render time.
 *
 * When a gravityforms/form block has a metaFormField attribute set,
 * reads that meta key from the current post and injects the value as
 * the formId before Gravity Forms renders the block.
 */
add_filter( 'render_block_data', function( $parsed_block, $source_block, $parent_block ) {
	if ( $parsed_block['blockName'] !== 'gravityforms/form' ) {
		return $parsed_block;
	}

	$meta_field = $parsed_block['attrs']['metaFormField'] ?? '';
	if ( ! $meta_field ) {
		return $parsed_block;
	}

	global $post;
	if ( ! $post ) {
		return $parsed_block;
	}

	$form_id = get_post_meta( $post->ID, $meta_field, true );
	if ( $form_id ) {
		$parsed_block['attrs']['formId'] = (string) $form_id;
	}

	return $parsed_block;
}, 10, 3 );
