import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(), // 禁用额外babel插件，避免依赖问题（v2规范）
    tsconfigPaths()
  ],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', 'fabric', 'classnames', 'react-is'], // 预构建3D/图形依赖
    exclude: ['@ant-design/icons']
  },
  server: {
    port: 5173, // 开发端口（v2复用）
    proxy: {
      '/api': { // 对接PLM/SCM系统接口代理
        target: 'https://internal.dicreate.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})