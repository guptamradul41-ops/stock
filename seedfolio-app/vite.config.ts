import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type PreviewServer, type ViteDevServer } from 'vite'

const appDirectory = path.dirname(fileURLToPath(import.meta.url))
const marketApiPath = path.resolve(appDirectory, '..', 'market-api', 'server.py')

function startMarketApi(server: ViteDevServer | PreviewServer) {
  const apiProcess = spawn(process.env.PYTHON || 'python', [marketApiPath], {
    cwd: appDirectory,
    env: process.env,
    stdio: 'inherit',
  })

  apiProcess.on('error', (error) => {
    console.error(`Unable to start the yfinance market API: ${error.message}`)
  })
  apiProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`The yfinance market API exited with status ${code}.`)
    }
  })

  server.httpServer?.once('close', () => {
    if (!apiProcess.killed) apiProcess.kill()
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'yfinance-market-api',
      configureServer: startMarketApi,
      configurePreviewServer: startMarketApi,
    },
  ],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8765',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(appDirectory, 'src'),
      'framer-motion': path.resolve(appDirectory, 'node_modules/framer-motion'),
      'gsap': path.resolve(appDirectory, 'node_modules/gsap'),
      'swiper/css/effect-cards': path.resolve(appDirectory, 'node_modules/swiper/modules/effect-cards.css'),
      'swiper/css': path.resolve(appDirectory, 'node_modules/swiper/swiper.css'),
      'swiper/react': path.resolve(appDirectory, 'node_modules/swiper/swiper-react.mjs'),
      'swiper/modules': path.resolve(appDirectory, 'node_modules/swiper/modules/index.mjs'),
    },
    dedupe: ['react', 'react-dom'],
  },
})
