const webpack = require("webpack");
const merge = require("webpack-merge");
const WebpackBar = require("webpackbar");
const SizePlugin = require("size-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";

const appDirectory = fs.realpathSync(process.cwd());
const appSrcPath = path.resolve(appDirectory, "src");
const buildPath = path.resolve(appDirectory, "build");
const dotenvPath = path.resolve(appDirectory, ".env");
const appHtmlPath = path.resolve(appDirectory, "public/index.html");

//#region Env is Recognized
const NODE_ENV = process.env.NODE_ENV;
var dotenvFiles = [
  `${dotenvPath}.${NODE_ENV}.local`,
  `${dotenvPath}.${NODE_ENV}`,
  NODE_ENV !== "test" && `${dotenvPath}.local`,
  dotenvPath
].filter(Boolean);
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile
      })
    );
  }
});

function getClientEnvironment() {
  const raw = Object.keys(process.env).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      NODE_ENV: process.env.NODE_ENV || "development"
    }
  );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return {
    raw,
    stringified
  };
}
//#endregion

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve("style-loader"),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          })
        ],
        sourceMap: false
      }
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: false
      }
    });
  }
  return loaders;
};

const baseConfig = {
  context: path.resolve(__dirname, "src"),
  devtool: "(none)",
  mode: "production",
  stats: {
    all: false,
    warnings: true,
    errors: true,
    errorDetails: true
  },
  output: {
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build", "static")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          requireEnsure: false
        }
      },
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: require.resolve("react-dev-utils/eslintFormatter"),
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: appSrcPath
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides"
              ),
              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: "@svgr/webpack?-svgo,+ref![path]"
                      }
                    }
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: isEnvProduction
            }
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve("babel-preset-react-app/dependencies"),
                  {
                    helpers: true
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              sourceMaps: false
            }
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: false
            }),
            sideEffects: true
          },
          {
            test: /\.module\.css$/,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: false,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            })
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: false
              },
              "sass-loader"
            ),
            sideEffects: true
          },
          {
            test: /\.module\.(scss|sass)$/,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: false,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              },
              "sass-loader"
            )
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: "media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};

module.exports = () => [
  merge(baseConfig, {
    name: "server",
    target: "node",
    entry: "./ssr/server.tsx",
    output: {
      libraryExport: "default",
      libraryTarget: "commonjs2",
      filename: "../ssr/mains.js"
    },
    plugins: [
      new webpack.DefinePlugin({
        "typeof window": '"undefined"',
        "typeof document": '"undefined"',
        ...getClientEnvironment().stringified
      }),
      new WebpackBar({
        name: "server"
      })
    ]
  }),
  merge(baseConfig, {
    name: "client",
    entry: "./ssr/client.tsx",
    output: {
      filename: isEnvProduction
        ? "[name].[contenthash:8].js"
        : isEnvDevelopment && "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: "head",
            template: appHtmlPath,
            filename: `${buildPath}/index.html`
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer"
      }),
      new webpack.DefinePlugin({
        "typeof window": '"object"',
        "typeof document": '"object"',
        ...getClientEnvironment().stringified
      }),
      new CleanTerminalPlugin({
        onlyInWatchMode: true
      }),
      new WebpackBar({
        name: "client"
      }),
      new SizePlugin()
    ].filter(Boolean)
  })
];
