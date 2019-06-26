const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = {
    resolve: {
        extensions: ['.js', '.jsx'], // 当通过import child from './child/child'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件
        mainFiles: ['index', 'view'], // 如果是直接引用一个文件夹，那么回去直接找index开头的文件，如果不存在再去找view开头的文件
        // alias: {
        //     home: path.resolve(__dirname, '../src/home') // 配置别名可以加快webpack查找模块的速度, 引入home其实是引入../src/home
        // }
    },
    module: {                 // 让 webpack 能够去处理那些非 JavaScript 文件
        rules: [{
            test: /\.js$/,    // 注意这里要写正确，不然useBuiltIns不起作用
            exclude: /node_modules/, // 排除node_modules中的代码
            use: [{
                loader: 'babel-loader', // 只是babel和webpack之间的桥梁，并不会将代码转译
            }]
        },
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]', // placeholder 占位符
                    outputPath: 'images/', // 打包文件名
                    limit: 204800, // 小于200kb则打包到js文件里，大于则打包到imgages里
                },
            },
        },
        {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].min.[ext]',
                    outputPath: 'fonts/',
                    limit: 5000,
                }
            },
        }]
    },
    plugins: [                     
        new HtmlWebpackPlugin({   // 向dist文件中自动添加模版html
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(), // 打包后先清除dist文件，先于HtmlWebpackPlugin运行
    ],
    output: {
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    }
}

module.exports = commonConfig;
