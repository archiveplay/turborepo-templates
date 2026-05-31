import { fileURLToPath, URL } from 'node:url'
import { ConfigEnv, createLogger, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const logger = createLogger('info', { prefix: '[vite.config.ts]' })

export const viteConfig = (opt: ConfigEnv) => {
  const env = loadEnv(opt.mode ?? 'test', process.cwd(), 'VITE_')
  if (opt.mode !== 'prod')
    logger.info(`vite started with env ${JSON.stringify(env)}`, { timestamp: true })

  return defineConfig({
    plugins: [vue(), vueDevTools()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL ?? 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
}
export default viteConfig
