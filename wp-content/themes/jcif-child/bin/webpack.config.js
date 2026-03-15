// bin/webpack.config.js
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

// Create separate configs for blocks and theme
const blocksConfig = {
  ...defaultConfig,
};

const themeConfig = {
  ...defaultConfig,
  entry: {
    frontend: "./src/frontend/index.js",
    editor: "./src/editor/index.js",
  },
};

// Export array of configs
module.exports = [blocksConfig, themeConfig];
