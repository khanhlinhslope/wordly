import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname)

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src')
        },
        {
          find: 'src',
          replacement: resolve(projectRootDir, 'src')
        },
        {
          find: 'components',
          replacement: resolve(projectRootDir, 'src/components')
        },
        {
          find: 'hooks',
          replacement: resolve(projectRootDir, 'src/hooks')
        },
        {
          find: 'utils',
          replacement: resolve(projectRootDir, 'src/utils')
        },
        {
          find: 'modules',
          replacement: resolve(projectRootDir, 'src/modules')
        }
      ]
    })
  ]
})
