import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /**
     * Plugin do TanStack Router para Vite
     * Habilita code splitting automático para rotas
     * e outras otimizações - cada rota vira um chunk separado
     */
    TanStackRouterVite({ autoCodeSplitting: true }), 
    viteReact()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
