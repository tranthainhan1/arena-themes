// generated on 2020-05-29 using generator-webapp 4.0.0-5
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const fs = require("fs");
const browserSync = require("browser-sync");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { argv } = require("yargs");

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;
const npmRun = require("npm-run");

/**
 *------------------------ NEED TO DECLARE OPTION HERE ------------------------------------------
 */
const shopifyHost = "https://arena-commerce.myshopify.com";
const themeId = "107369300119";
const apiKey = "b0a6c73733f01a8e1b00fd5a2b23c3a8";
const pwd = "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";
const apiVer = "2020-07";
let _jsName = "custom.js";

let changeFlag = "";
const path = require("path");
const rp = require("request-promise");
/**============================================================================================== */

/**==============================================================================  SCRIPT FUNCTION */
async function scripts(minify) {
  changeFlag = "js";
  //const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const MinifyPlugin = require("babel-minify-webpack-plugin");
  const webpack = require("webpack");
  let _plugins = [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jquery: "jquery",
    // }),
    new webpack.ProgressPlugin(),
  ];
  if (minify === true) {
    _plugins.push(
      new MinifyPlugin(
        {},
        {
          comments: false,
          test: /\.(js)\.liquid$/,
          exclude: /(node_modules)/,
        }
      )
    );
  }

  const config = {
    entry: {
      custom: path.resolve(__dirname, "./", "app/scripts/custom.js"),
    },

    mode: "production",

    output: {
      filename: "[name].js.liquid",
      path: path.resolve(__dirname, "./", "theme/assets"),
      chunkFilename: "[name].js.liquid",
    },

    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: "babel-loader",
          exclude: /(node_modules)/,
        },
      ],
    },

    node: {
      fs: "empty",
    },

    resolve: {
      extensions: ["*", ".js"],
    },

    plugins: _plugins,
  };

  let babel_task = await new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      // Stats Object
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.log(err);
        resolve("Cannot bundle js");
      }
      // Done processing
      resolve(1);
    });
  });

  return babel_task;
}

/**
 * ================================================================================================
 */

/**
 * BROWSER SYNC SERVER
 */
async function startAppServer() {
  server.init({
    notify: true,
    port,
    proxy: shopifyHost,
    snippetOptions: {
      // Provide a custom Regex for inserting the snippet.
      rule: {
        match: /<\/body>/i,
        fn: function (snippet, match) {
          return snippet + match;
        },
      },
    },
  });

  watch(`app/scripts/**/*.js`, scripts);

  watch(".tmp/theme.update").on("change", testReload);
}

function testReload() {
  setTimeout(() => {
    server.reload();
  }, 1000);
}

let serve;

serve = series(startAppServer);

exports.serve = serve;
