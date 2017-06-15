/**
 * !VCropper
 *
 * 本地example调试配置
 *
 * @author yiwei
 * @data 2017-06-14
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        entry: path.join(__dirname, '../example/entry'),
        vendors: ['vue']
    },

    // 输出
    output: {
        path: path.join(__dirname, '../example/dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },

    resolve: {
        alias: {
            vcropper: path.join(__dirname, '../src/index.js')
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: '[name].bundle.js' }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../example/dist/index.html'),
            template: path.join(__dirname, '../example/index.html')
        })
    ]
});
