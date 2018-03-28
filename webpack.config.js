const path = require('path'); // node系统模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
const cleanWebpackPlugin = require('clean-webpack-plugin'); // 清除
const uglify = require('uglifyjs-webpack-plugin'); // 压缩
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离
const PurifyCssWebpack = require('purifycss-webpack'); // 消除冗余css

const glob = require('glob');
const webpack = require('webpack');

module.exports = {
    // 入口
    entry: {
        index: './src/index.js',
        index2: './src/index2.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'), // path 必须是绝对路径
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader'],
                    publicPath: '../' // 将提取出来的css中，包含图片的路径，前面加上../
                    // 因为css引用图片打包后，前面的相对路径都没有了
                })
            },
            {
                test: /\.less$/,
                // use:['style-loader','css-loader','less-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader'],
                })

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20000,
                        outputPath: 'images' // 图片打包出去的目录
                    }
                }]
            }
        ]
    },
    devServer: {
        // 设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, 'dist'),
        // 服务器ip地址，或者localhost
        host: 'localhost',
        // 设置端口
        port: 8090,
        // 自动打开页面
        open: true,
        // 热更新
        hot: true
    },
    plugins: [
        new uglify(),
        new webpack.HotModuleReplacementPlugin(),
        new cleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            title: 'I love',
            template: './src/view/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['index2'],
            filename: 'index2.html',
            title: 'I love 222',
            template: './src/view/index.html'
        }),
        new ExtractTextPlugin('css/index.css'),
        new PurifyCssWebpack({
            paths:glob.sync(path.join(__dirname,'src/view/*.html'))
        })
    ]
}