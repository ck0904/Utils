   proxyTable: {
       '/api': {
           target:'http://192.168.16.36:8080', // 这个是你要代理的地址(开发阶段接口地址)
           changeOrigin: true,//跨域需要加上这个
           pathRewrite: {
               '^/api': '/' 这里的/其实就是代表根,可以理解为用/api代表target里的地址
           }
       }
   }
