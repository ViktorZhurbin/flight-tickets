/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const outputDirectory = '../build';

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new BundleAnalyzerPlugin(),
    ],
});
