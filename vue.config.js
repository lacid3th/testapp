// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// }) 원래 있었던 코드

module.exports = {
  devServer: { 
    proxy: { 
      '/api': { 
        target: 'http://localhost:8000/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },

  // 상대경로 코딩 유의, 설정하고 npm run build 다시 해야 적용됨 주의
  outputDir: './backend/public',

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
}
