// generated on 2020-05-29 using generator-webapp 4.0.0-5
const { src, dest, watch, series, parallel, lastRun, task } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync");
const notify = require("gulp-notify");
const fs = require("fs");
const { argv } = require("yargs");
const rename = require("gulp-rename");
const merge = require("merge-stream");

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

/**
 *------------------------ NEED TO DECLARE OPTION HERE ------------------------------------------
 */
const shopifyHost = "https://arena-commerce.myshopify.com";

const path = require("path");
const { throws } = require("assert");

/**==============================================================================  SCRIPT FUNCTION */
async function scripts(filePath) {
  // const MinifyPlugin = require("babel-minify-webpack-plugin");
  const webpack = require("webpack");
  let dirName = path.dirname(filePath);
  let fileName = fs.readdirSync(dirName).find((file) => file.match(/^[^_].*\.js$/g));
  let newPath = path.resolve(__dirname, path.join(dirName, fileName));
  let _plugins = [new webpack.ProgressPlugin()];

  // if (minify === true) {
  //   _plugins.push(
  //     new MinifyPlugin(
  //       {},
  //       {
  //         comments: false,
  //         test: /\.(js)\.liquid$/,
  //         exclude: /(node_modules)/,
  //       }
  //     )
  //   );
  // }

  const config = {
    entry: newPath,

    mode: "production",

    output: {
      filename: `${fileName}.liquid`,
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
      }
      // Done processing
      resolve(1);
    });
  });

  return babel_task;
}

function copy(filePath) {
  let fileName = path.basename(filePath);
  let dirList = fs.readdirSync("app/scripts").filter((dir) => {
    let isDir = fs.lstatSync(path.resolve(__dirname, "app/scripts", dir)).isDirectory();
    if (isDir && dir !== ".common") return true;

    return false;
  });
  let newDir = dirList.map((dir) => {
    return path.join("app/scripts", dir);
  });
  let tasks = newDir.map((dir) => {
    return src(filePath)
      .pipe(rename(`_${fileName}`))
      .pipe(dest(dir));
  });

  return merge(tasks);
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

  watch(["app/scripts/**/*.js", "!app/scripts/.common/_arn.js", "!app/scripts/.common/AT_section.js"]).on(
    "change",
    scripts
  );
  watch(["app/scripts/.common/arn.js"]).on("change", copy);
  watch(".tmp/theme.update").on("change", testReload);
}

task("watch", () => {});
function testReload() {
  setTimeout(() => {
    server.reload();
  }, 1500);
}

let serve;

serve = series(startAppServer);

exports.serve = serve;
