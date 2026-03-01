const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		// Theme scripts
		head: path.resolve( __dirname, 'src/head.js' ),
		scripts: path.resolve( __dirname, 'src/scripts.js' ),

		// Theme styles (CSS extracted from these JS entry points)
		style: path.resolve( __dirname, 'src/style.js' ),
		'editor-styles': path.resolve( __dirname, 'src/editor-styles.js' ),

		// ACF block scripts
		'blocks/atomic-donations/index': path.resolve(
			__dirname,
			'src/js/blocks/atomic-donations/index.js'
		),
		'blocks/atomic-posts/index': path.resolve(
			__dirname,
			'src/js/blocks/atomic-posts/index.js'
		),
		'blocks/starter-block/index': path.resolve(
			__dirname,
			'src/js/blocks/starter-block/index.js'
		),
	},
	output: {
		...defaultConfig.output,
		// Output to dist/ instead of wp-scripts default build/
		path: path.resolve( __dirname, 'dist' ),
	},
};
