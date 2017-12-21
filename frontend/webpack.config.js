/*
* @author  Hamid belahrach
*/

const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // require webpack plugin
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin"); // require webpack plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

let config = {
  entry: "./src/index.js",
  output: {
    publicPath: "/",
    path: path.resolve("public"),
    filename: "output.js"
  },
  devServer: {
    hot: true,
    publicPath: "/",
    contentBase: path.resolve(__dirname, "./src"), // A directory or URL to serve HTML content from.
    historyApiFallback: {
      index: `/index.html`,
      verbose: false
    },
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    open: true, // open default browser while launching
    port: 8081
  },
  devtool: "eval-source-map", // enable devtool for better debugging experience
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".scss",
      ".css",
      ".jpeg",
      ".jpg",
      ".gif",
      ".png"
    ] // Automatically resolve certain extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: "babel-loader" // use this (babel-core) loader
      },
      {
        test: /\.(scss|css)$/, // files ending with .scss
        use: ["css-hot-loader"].concat(
          ExtractTextWebpackPlugin.extract({
            // HMR for styles
            fallback: "style-loader",
            use: ["css-loader", "sass-loader", "postcss-loader"]
          })
        )
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
        loaders: [
          "file-loader?context=src/assets/images/&name=images/[path][name].[ext]",
          {
            // images loader
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: "75-90",
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin("styles.css"),
    new HtmlWebpackPlugin({
      hash: false,
      template: path.resolve(__dirname, "./public/index.html"),
      inject: "body",
      filename: "index.html"
    }),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
  ]
};

module.exports = config;

if (process.env.NODE_ENV === "production") {
  // if we're in production mode, here's what happens next
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets() // call the css optimizer (minfication)
  );
}
