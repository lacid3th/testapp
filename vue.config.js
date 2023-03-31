// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// }) 원래 있었던 코드

module.exports = { 
  devServer: { 
    proxy: { 
      '/api': { 
        target: 'http://localhost:3000/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: './backend/public', // 상대경로 코딩 유의, 설정하고 npm run build 다시 해야 적용됨 주의
}
