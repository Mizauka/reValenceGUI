import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/reValence/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 告诉 Vue：所有以 mdui- 开头的标签名都是原生的 Web Components
          isCustomElement: (tag) => tag.startsWith('mdui-')
        }
      }
    })
  ]
})