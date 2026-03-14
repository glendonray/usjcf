const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
  ...defaultConfig,
  entry: {
    // Theme scripts
    head: path.resolve(__dirname, "src/head.js"),
    scripts: path.resolve(__dirname, "src/scripts.js"),

    // Theme styles (CSS extracted from these JS entry points)
    style: path.resolve(__dirname, "src/style.js"),
    "editor-styles": path.resolve(__dirname, "src/editor-styles.js"),
  },
};
