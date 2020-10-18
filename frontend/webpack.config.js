const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => ({
  entry: path.resolve(__dirname, "src/app.tsx"),
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html")
    }),
    new webpack.DefinePlugin({
      'process.env.API_ENDPOINT': JSON.stringify(env?.API_ENDPOINT || "http://localhost:3000"),
    })
  ]
});
