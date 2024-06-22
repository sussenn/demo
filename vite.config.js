import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
// css样式库
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS()
  ],

  resolve: {
    alias: {
      // 配置路径别名
      '@': path.resolve(__dirname, 'src')
    }
  },

  // vite跨域处理 https://cn.vitejs.dev/config/server-options.html#server-proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8826',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})

