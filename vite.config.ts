import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [splitVendorChunkPlugin(), react(), viteTsconfigPaths(), svgrPlugin()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          animejs: ['animejs'],
          pixijs: ['pixi.js', '@pixi/sound'],
        },
      },
    },
  },
})
