/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import sslPlugin from '@vitejs/plugin-basic-ssl'

export default ({ mode }) => {
  const envPrefix = 'REACT_APP_'
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), envPrefix) }
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      }
    }, {}),
  }
  const proxyUrl = process.env.PROXY_URL || process.env.npm_package_proxy // "proxy" variable imported from top-level package.json
  const config = {
    envPrefix: envPrefix,
    cacheDir: '.vite',
    build: {
      outDir: 'build',
      sourcemap: false,
    },
    publicDir: 'public',
    server: {
      host: 'localhost',
      open: true,
      port: process.env.PORT || 3000,
      proxy: {
        '/api': {
          target: proxyUrl,
          changeOrigin: true,
        },
        '/auth': {
          target: proxyUrl,
          changeOrigin: true,
        },
      },
    },
    define: processEnvValues,
    resolve: {
      alias: {
        // Add your code aliases here, like you would in jsconfig or tsconfig files if not already done
      },
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
      sslPlugin(),
      // Custom plugin to load Markdown files
      {
        name: 'markdown-loader',
        transform(code, id) {
          if (id.slice(-3) === '.md') {
            // For .md files, get the raw content
            return `export default ${JSON.stringify(code)};`
          }
        },
      },
    ],
  }
  return defineConfig(config)
}
