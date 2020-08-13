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
let _cssName = "main_style.css";
let _minifyCss = true;
let _jsName = "custom.js";

let changeFlag = "",
  firstBuild = true;
const path = require("path");
const rp = require("request-promise");

/**=========================================================================== STYLE FUNCTION */
function styles() {
  changeFlag = "css";
  return src("app/styles/*.scss")
    .pipe($.plumber())
    .pipe(
      $.sass
        .sync({
          outputStyle: "expanded",
          precision: 10,
          includePaths: ["."],
        })
        .on("error", $.sass.logError)
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe($.rename(_cssName))
    .pipe(dest("theme/assets"));
}
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

  /*
  changeFlag = 'js';
  // Get all js file on app/*.js
  let files = await new Promise((resolve, reject) => {
    fs.readdir('app/scripts', (err, files) => {
      if(err) resolve(err.message);
      resolve(files);
    })
  });
  if(typeof files == 'string') {
    throw new Error('Cannot read script files');
  }

  // Concat file based on order index
  let orderedFiles = [], fileCount = files.length;
  let concatVal = await new Promise((resolve, reject) => {
    for(let i = 0; i < files.length; i++) {
      let fileName = files[i];
      fs.readFile(`app/scripts/${fileName}`, {encoding: 'utf8'}, (err, data) => {
        let orderMark = data.match(/\/\/\s*\@order\s*=\s*[0-9]+/gm);
        let order = 1;
        if(orderMark) {
          let orderIdx = orderMark[0].split("=")[1];
          order = parseInt(orderIdx);
          orderedFiles.push({
            order,
            content: data.replace(orderMark[0], ""),
          })
        } 
        
        fileCount--;

        if(!fileCount) {
          orderedFiles.sort(function(a, b) {
            return a.order - b.order;
          });
          let returnContent = '';
          orderedFiles.map(item => {
            returnContent += item.content + '\n';  
          })
          resolve(returnContent);
        }
      })
    }
  })

  // Write new concated file
  await new Promise((resolve, reject) => {
    fs.writeFile(`app/scripts/${_jsName}`, concatVal, (_err) => {
      if(_err) {
        throw new Error('Cannot merge script files');  
      } else {
        resolve(1);    
      }
    })
  })

  // Write the file to theme/assets
  return src(`app/scripts/${_jsName}`)
    .pipe($.rename(`${_jsName}.liquid`))
    .pipe(dest('theme/assets'))
    */
}
/**============================================================================================== */

/**=====================================================================  IMAGE OPTIMIZE FUNCTION */
function images() {
  return src("app/images/**/*", { since: lastRun(images) })
    .pipe($.imagemin())
    .pipe(dest("dist/images"));
}
/**============================================================================================== */

/**
 * ==================================== UPDATE LAYOUT/THEME.LIQUID BASED ON ENVIROMENT PARAM FOR CSS
 */
function updateLayout(env) {
  return new Promise((resolve, reject) => {
    rp({
      uri: `https://${apiKey}:${pwd}@${shopifyHost.replace(
        "https://",
        ""
      )}/admin/api/${apiVer}/themes/${themeId}/assets.json?asset[key]=layout/theme.liquid`,
      method: "GET",
      json: true,
    })
      .then((res) => {
        let content = res.asset.value;
        // Remove existed css_variables.liquid refer
        let newLayout = content.replace(
          /\{\%\s*include.+css_variables(?:(?!\%\}).)+\%\}/gm,
          ""
        );
        // Remove existed main.css refer
        newLayout = newLayout.replace(
          new RegExp(
            `\\{\\{\\s*(?:'|")${_cssName.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            )}(?:'|")(?:(?!\\}\\}).)+\\}\\}`,
            "gm"
          ),
          ""
        );
        // Append new refer
        let newLink =
          env == "production"
            ? `{% include 'css_variables' %}\n{{ '${_cssName}' | asset_url | stylesheet_tag }}`
            : `{{ '${_cssName}' | asset_url | stylesheet_tag }}`;
        newLayout = newLayout.replace(/\<\/head\>/gm, `${newLink}\n</head>`);
        // Re-deploy layout/theme.liquid
        rp({
          uri: `https://${apiKey}:${pwd}@${shopifyHost.replace(
            "https://",
            ""
          )}/admin/api/${apiVer}/themes/${themeId}/assets.json`,
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            asset: {
              key: "layout/theme.liquid",
              value: newLayout,
            },
          }),
        })
          .then((_res) => {
            resolve({
              status: "success",
            });
          })
          .catch((err) => {
            resolve({
              status: "error",
              msg: err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err.message);
        resolve({
          status: "error",
          msg: err.message,
        });
      });
  });
}
/**
 * ================================================================================================
 */

/**
 * ====================================================== BUILD FILE FOR PRODUCTION SHOPIFY PACKAGE
 */
const build = parallel(
  productionStyles.bind(this, _minifyCss),
  scripts.bind(this, true)
);

async function productionStyles(_minify) {
  // Strip out variable declaration on theme/assets/main.css
  let task_1 = new Promise((resolve, reject) => {
    fs.readFile(
      `theme/assets/${_cssName}`,
      { encoding: "utf8" },
      (err, data) => {
        if (!err) {
          let newCss = data.replace(
            /\/\*remove_production(?:(?!\/\*end_remove_production\*\/)(.|\s))+\/\*end_remove_production\*\//gm,
            ""
          );
          fs.writeFile(`theme/assets/${_cssName}`, newCss, (_err) => {
            if (!_err) {
              if (_minify) {
                src(`theme/assets/${_cssName}`)
                  .pipe(
                    $.postcss([cssnano({ safe: true, autoprefixer: false })])
                  )
                  .pipe(dest("theme/assets"));
              }
              resolve({
                status: "success",
                filePath: `assets/${_cssName}`,
              });
            } else {
              resolve({
                status: "error",
                msg: err.message,
              });
            }
          });
        } else {
          resolve({
            status: "error",
            msg: err.message,
          });
        }
      }
    );
  });

  // Generate theme/snippets/css_variables.liquid
  let task_2 = new Promise((resolve, reject) => {
    fs.readFile(
      "app/styles/variables.scss.liquid",
      { encoding: "utf8" },
      (err, data) => {
        if (!err) {
          let newVars = data
            .replace(/\/\*remove_production\*\//gm, "<style>")
            .replace(/\/\*end_remove_production\*\//gm, "</style>");
          fs.writeFile(
            "theme/snippets/css_variables.liquid",
            newVars,
            (_err) => {
              if (!_err) {
                resolve({
                  status: "success",
                  filePath: "snippets/css_variables.liquid",
                });
              } else {
                resolve({
                  status: "error",
                  msg: err.message,
                });
              }
            }
          );
        } else {
          resolve({
            status: "error",
            msg: err.message,
          });
        }
      }
    );
  });

  let task_3 = updateLayout("production");

  let allTasks = await Promise.all([task_1, task_2, task_3]);

  // Deploy files to Shopify store
  let commandString = "cd theme/ && theme deploy ";
  for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    if (task.status === "success" && i != allTasks.length - 1) {
      commandString += `./${task.filePath} `;
    }
  }
  npmRun.exec(commandString, function (err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });

  return true;
}
/**
 * ================================================================================================
 */

/**
 * ADD REFER JS LINK TO LAYOUT/THEME.LIQUID
 */
function prepareJs() {
  return new Promise((resolve, reject) => {
    rp({
      uri: `https://${apiKey}:${pwd}@${shopifyHost.replace(
        "https://",
        ""
      )}/admin/api/${apiVer}/themes/${themeId}/assets.json?asset[key]=layout/theme.liquid`,
      method: "GET",
      json: true,
    })
      .then((res) => {
        let content = res.asset.value;
        // Remove existed js link
        let newLayout = content.replace(
          new RegExp(
            `\\<script.+(?:'|")${_jsName.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            )}(?:'|")\\s\\|\\sasset_url(?:(?!\\<\\/script\\>).)+\\<\\/script\\>`,
            "gm"
          ),
          ""
        );
        // Append new custom js link bellow main js file
        let match = newLayout.match(
          /\<script.+(?:'|")app.js(?:'|")\s\|\sasset_url(?:(?!\<\/script\>).)+\<\/script\>/gm
        );
        let appendLinks = `<script src="{{ 'app.js' | asset_url }}"></script>\n<script src="{{ 'custom.js' | asset_url }}"></script>`;
        newLayout = newLayout.replace(match[0], appendLinks);
        rp({
          uri: `https://${apiKey}:${pwd}@${shopifyHost.replace(
            "https://",
            ""
          )}/admin/api/${apiVer}/themes/${themeId}/assets.json`,
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            asset: {
              key: "layout/theme.liquid",
              value: newLayout,
            },
          }),
        })
          .then((_res) => {
            resolve({
              status: "success",
            });
          })
          .catch((err) => {
            resolve({
              status: "error",
              msg: err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err.message);
        resolve({
          status: "error",
          msg: err.message,
        });
      });
  });
}

/**
 *  CONVERT SCSS LIQUID TO CSS VAR
 */
function prepareCssVar() {
  return (async () => {
    // Read theme/config/settings_data.json
    let currentSettings = new Promise((resolve, reject) => {
      fs.readFile(
        "theme/config/settings_data.json",
        { encoding: "utf8" },
        (err, data) => {
          if (err) {
            resolve({
              status: "error",
              msg: err.message,
            });
          } else {
            let currentSettings = JSON.parse(data)["current"];
            resolve({
              status: "success",
              currentSettings,
            });
          }
        }
      );
    });

    // Read vars declared in variable liquid file
    let currentVars = new Promise((resolve, reject) => {
      fs.readFile(
        "app/styles/variables.scss.liquid",
        { encoding: "utf8" },
        (err, data) => {
          if (err) {
            resolve({
              status: "error",
              msg: err.message,
            });
          } else {
            resolve({
              status: "success",
              curVars: data,
            });
          }
        }
      );
    });

    // Remove Css refer on layout/theme.liquid
    let task_3 = updateLayout("dev");

    let bulkTask = await Promise.all([currentSettings, currentVars, task_3]);
    let errorTask = bulkTask.find((task) => task.status == "error");
    if (errorTask) {
      console.log(errorTask.msg);
      throw new Error("Error when prepare variable css file");
    }
    let settings = bulkTask[0].currentSettings;
    let vars = bulkTask[1].curVars;
    let matchVars = vars.match(/\{\{\s*settings\.(?:(?!\}\}).)+\}\}/gm);
    if (matchVars) {
      let newVars = vars;
      // Replace all setting to static value
      for (let i = 0; i < matchVars.length; i++) {
        let match = matchVars[i].replace(/(\{\{|\}\})/gm, "").trim();
        match = match.split(".")[1];
        if (match in settings) {
          newVars = newVars.replace(matchVars[i], settings[match]);
        }
      }
      // Write Css variable file based on setting data from Shopify
      let writeTask = await new Promise((resolve, reject) => {
        fs.writeFile("app/styles/_variables.scss", newVars, (err) => {
          if (err) throw new Error("Cannot write css variables file");
          resolve(1);
        });
      });

      return {
        status: "success",
      };
    } else {
      throw new Error("No data to build css variable");
    }
  })().catch((err) => {
    return {
      status: "error",
      msg: err.message,
    };
  });
}

/**
 * BROWSER SYNC SERVER
 */
async function startAppServer() {
  let __cssVar = await prepareCssVar();

  let __js = await prepareJs();

  if (__cssVar.status == "error") {
    throw new Error(__cssVar.msg);
  }

  if (__js.status == "error") {
    throw new Error(__js.msg);
  }

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

  watch("app/styles/**/*.scss", styles);
  //watch(`app/scripts/**/!(${_jsName.replace(".js", "")}).js`, scripts);
  watch(`app/scripts/**/*.js`, scripts);

  watch(".tmp/theme.update").on("change", testReload);
}

function testReload() {
  if (firstBuild) {
    npmRun.exec(
      `cd theme/ && theme deploy ./assets/${_cssName} ./assets/${_jsName}.liquid`,
      function (err, stdout, stderr) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
        firstBuild = false;
        server.reload();
      }
    );
  } else {
    if (changeFlag === "css") {
      changeFlag = "";
      server.reload("*.css");
    } else if (changeFlag === "js") {
      changeFlag = "";
      setTimeout(() => {
        server.reload();
      }, 1000);
    } else {
      setTimeout(() => {
        server.reload();
      }, 1000);
    }
  }
}

let serve;

serve = series(startAppServer, parallel(styles, scripts));

exports.serve = serve;
exports.build = build;
exports.default = build;
