
module.exports = {
  devServer: {
    // host: '0.0.0.0',
    open: true, // 自动打开浏览器
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    // disableHostCheck: true,
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:9091', // 代理目标的基础路径
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
}




// module.exports = {
//   "publicPath": "./",
//   "outputDir": "dist",
//   "assetsDir": "static",
//   "indexPath": "index.html",
//   "filenameHashing": true,
//   "pages": {
//     "index": {
//       "entry": "src/main.js",
//       "template": "public/index.html",
//       "filename": "index.html",
//       "title": "Index Page",
//       "chunks": [
//         "chunk-vendors",
//         "chunk-common",
//         "index"
//       ]
//     }
//   },
//   "lintOnSave": true,
//   "runtimeCompiler": false,
//   "transpileDependencies": [
//     "vuetify"
//   ],
//   "productionSourceMap": true,
//   "crossorigin": "",
//   "integrity": false,
//   // "devServer": {
//   //   // "open": false,
//   //   // "host": "0.0.0.0",
//   //   // "port": 8848,
//   //   // "https": false,
//   //   // "hotOnly": false,
//   //   "proxy": {
//   //     "/api": {
//   //       target: "http://localhost:8080",
//   //       changeOrigin: true,
//   //       ws: true,
//   //       secure: false,
//   //       pathRewrite: {
//   //         "": ""
//   //       }
//   //     },
//   //     "/foo": {
//   //       "target": "<other_url>"
//   //     }
//   //   }
//   // },
//   devServer: {
//     host: 'localhost',
//     port:8080,
//     open: true, // 自动打开浏览器
//     // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
//     // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
//     proxy: {
//         '/api': { // 匹配所有以 '/api'开头的请求路径
//             target: 'http://localhost:9090', // 代理目标的基础路径
//             // secure: false,  // 如果是https接口，需要配置这个参数
//             changeOrigin: true, // 支持跨域
//             pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
//                 '^/api': ''
//             }
//         }
//     }
// },
//
//   "css": {
//     "sourceMap": false,
//     "loaderOptions": {
//       "css": {},
//       "postcss": {}
//     },
//     "modules": false
//   },
//   "parallel": true,
//   "pwa": {},
//   "pluginOptions": {}
// }