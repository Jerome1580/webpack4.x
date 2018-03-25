const path = require('path'); // node系统模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
const cleanWebpackPlugin = require('clean-webpack-plugin'); // 清除
const webpack = require('webpack');

module.exports = {
    // 入口
    entry:{
        index:'./src/index.js',
        index2:'./src/index2.js'
    },
    // 出口
    output:{
        path:path.resolve(__dirname,'dist'), // path 必须是绝对路径
        filename:'[name].bundle.js'
    },
    devServer:{
        // 设置服务器访问的基本目录
        contentBase:path.resolve(__dirname,'dist'),
        // 服务器ip地址，或者localhost
        host:'localhost',
        // 设置端口
        port:8090,
        // 自动打开页面
        open:true,
        // 热更新
        hot:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new cleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            chunks:['index'],
            filename:'index.html',
            title:'I love',
            template:'./src/view/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks:['index2'],
            filename:'index2.html',
            title:'I love 222',
            template:'./src/view/index.html'
        }),
    ]
}