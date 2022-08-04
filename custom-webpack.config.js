/*import { AngularWebpackPlugin } from "@ngtools/webpack";
import linkerPlugin from "@angular/compiler-cli/linker/babel";

export default {
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "@ngtools/webpack",
      },
      {
        test: /\.[cm]?js$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            compact: false,
            plugins: [linkerPlugin],
          },
        },
      },
    ],
  },

  plugins: [
    new AngularWebpackPlugin({
      tsconfig: "./tsconfig.json",
    }),
  ],
};*/

const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['es']
    }),
    new webpack.DefinePlugin({
      STABLE_FEATURE: JSON.stringify(true),
      EXPERIMENTAL_FEATURE: JSON.stringify(false)
    })
  ],
  devServer: {
    proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
          secure: false,
          changeOrigin: true
        },
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    allowedHosts: [
        'factodev.upmeup.es',
    ],
    /*client: {
        webSocketURL: 'ws://127.0.0.1:8100/ws',
    },*/
  compress: true,
    //host: "http://factodev.upmeup.es/login",
    //port: 4200,
  },
};
