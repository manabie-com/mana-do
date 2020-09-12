const path = require('path');
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    '@http': path.resolve(__dirname, "./src/network/http/index.ts")
  }),

);

