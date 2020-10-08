// generated on 2020-05-29 using generator-webapp 4.0.0-5
const { src, dest, watch, series, parallel, lastRun, task } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync");
const fs = require("fs");
const { argv } = require("yargs");

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

/**
 *------------------------ NEED TO DECLARE OPTION HERE ------------------------------------------
 */
const shopifyHost = "https://arena-commerce.myshopify.com";

const path = require("path");

/**==============================================================================  SCRIPT FUNCTION */
async function scripts(filePath) {
  const MinifyPlugin = require("babel-minify-webpack-plugin");
  const webpack = require("webpack");
  let fileName = path.basename(filePath);

  let _plugins = [];

  // if (true) {
  //   _plugins.push(
  //     new MinifyPlugin(
  //       {},
  //       {
  //         comments: false,
  //         test: /\.(js)$/,
  //         exclude: /(node_modules)/,
  //       }
  //     )
  //   );
  // }

  const config = {
    entry: path.resolve(__dirname, filePath),

    mode: "production",

    output: {
      filename: `${fileName}`,
      path: path.resolve(__dirname, "./", "theme/assets"),
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
    stats: "errors-only",
  };

  let babel_task = await new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      // Stats Object
      if (err || stats.hasErrors()) {
        // Handle errors here

        console.log(err);
        console.log(stats.compilation.errors);
      } else {
        // Done processing
        console.log(`${fileName}: Finish`);
        resolve("1");
      }
    });
  });

  return babel_task;
}

function scriptsMutilpe(filaPath) {
  let fileList = fs.readdirSync(path.join("app/scripts")).reduce((accu, currentValue) => {
    let newPath = path.join("app/scripts", currentValue);
    fs.lstatSync(path.resolve(__dirname, newPath)).isDirectory() ? accu : accu.push(newPath);
    return accu;
  }, []);

  fileList.forEach((filePath) => {
    scripts(filePath);
  });
}

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

  watch(["app/scripts/**/*.js", "!app/scripts/common/**/*.js"]).on("change", scripts);
  // watch(["app/scripts/common/**/*.js"]).on("change", scriptsMutilpe);
  watch(".tmp/theme.update").on("change", testReload);
}

function testReload() {
  setTimeout(() => {
    server.reload();
  }, 1500);
}
let build = parallel(scriptsMutilpe);

let serve;

serve = series(startAppServer);

exports.serve = serve;
exports.build = build;
