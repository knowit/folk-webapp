/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import sslPlugin from '@vitejs/plugin-basic-ssl'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const proxyUrl = process.env.PROXY_URL || process.env.npm_package_proxy // "proxy" variable imported from top-level package.json
  const config = {
    envPrefix: 'REACT_APP_',
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
    define: {
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
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
    ],
  }
  return defineConfig(config)
}
