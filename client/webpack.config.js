const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { Template } = require('webpack');

// TODO: Add and configure workbox plugins for a service worker and manifest file.



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Progressive Web Application',
        template: './index.html'
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),

      new WebpackPwaManifest({
        name: 'Note taker',
        short_name: 'NT',
        description: 'An application that can be used to write and save notes.',
        display: 'standalone',
        theme_color: '#01579b',
        background_color: '#01579b',
        start_url: '/',
        publicPath: '/',
        inject: true,
        fingerprints: false,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]
      })
    ],
    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime']

            }
          }
        }



      ],
    },
  };
};
