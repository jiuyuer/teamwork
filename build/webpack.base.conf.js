'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack入口文件
  entry: {
    app: './src/main.js'
  },
  // webpack输出路径和命名规则
  output: {
    path: config.build.assetsRoot,                      // webpack输出的目标文件夹路径（例如：/dist）
    filename: '[name].js',                              // webpack输出bundle文件命名格式
    publicPath: process.env.NODE_ENV === 'production'   // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      '@': resolve('src'),  // 比如@就代表直接从/src 下开始找起!!!
      //"~": resolve("src/components")
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      // 对所有.vue文件使用vue-loader进行编译
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // 对图片资源文件使用url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 对字体资源文件使用url-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
           // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
           // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
