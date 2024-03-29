const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");

module.exports = {
  entry: {
    main: ["whatwg-fetch", path.join(__dirname, "src", "index.js")],
  },

  output: {
    path: path.join(__dirname, "dist"),
    crossOriginLoading: "anonymous",
  },

  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]",
      },

      // { test: /\.json$/, loader: "json-loader" },

      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: "svelte-loader",
      },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new SriPlugin({
      hashFuncNames: ["sha256", "sha384"],
      enabled: process.env.NODE_ENV === "production",
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true,
      integrity: true,
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/fonts/",
        to: "fonts/",
        flatten: true,
      },
    ]),
  ],
};
