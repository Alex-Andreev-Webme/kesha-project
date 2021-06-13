const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: {
      main: "./src/pages/index.js",
   },

   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: "",
   },

   mode: "development",
   devServer: {
      contentBase: path.resolve(__dirname, "./dist"),
      open: true,
      compress: true,
      port: 8080,
   },

   module: {
      rules: [
         {
            test: /\.js$/,
            use: "babel-loader",
            exclude: "/node_modules/",
         },

         {
            test: /\.(png|svg|jpg|gif|ico|woff(2)?|eot|ttf|otf)$/,
            type: "asset/resource",
         },

         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: {
                     importLoaders: 1,
                  },
               },
               "postcss-loader",
            ],
         },
      ],
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
      }),
      new HtmlWebpackPlugin({
         filename: "services.html",
         template: "./src/services.html",
      }),
      new HtmlWebpackPlugin({
         filename: "reviews.html",
         template: "./src/reviews.html",
      }),
      new HtmlWebpackPlugin({
         filename: "vacancies.html",
         template: "./src/vacancies.html",
      }),
      new HtmlWebpackPlugin({
         filename: "contacts.html",
         template: "./src/contacts.html",
      }),
      new HtmlWebpackPlugin({
         filename: "about.html",
         template: "./src/about.html",
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
   ],
};
