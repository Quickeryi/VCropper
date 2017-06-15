/**
 * !VCropper
 *
 * 基础配置项
 *
 * @author yiwei
 * @data 2017-06-14
 */
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader!autoprefixer-loader'
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2017'],
                    plugins: ['transform-runtime', 'transform-class-properties']
                }
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    }
};