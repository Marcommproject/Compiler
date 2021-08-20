const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  mode: 'production',
  output: {
	path: `${__dirname}/dist`,
	filename: 'bundle.js',
  },
  plugins: [new MiniCssExtractPlugin(),new CleanWebpackPlugin()],
  module: {
	rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
	 
		  {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        },
     
	  {
		test: /\.(svg|gif|png|eot|woff|ttf)$/,
		use: [
		  'url-loader',
		],
	  },
	],
  },
  optimization: {
	minimize: true,
	minimizer: [
	  new TerserPlugin({
		extractComments: false,
	  }),
	  new OptimizeCssAssetsPlugin(),
	],
  },
};