import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const paths = {
  '@': 'src',
  src: 'src',
  assets: 'src/assets',
  components: 'src/components',
  hooks: 'src/hooks',
  lib: 'src/lib',
  modules: 'src/modules',
  styles: 'src/styles',
  utils: 'src/utils'
}

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    pathsResolver(paths)
  ]
})

function pathsResolver (paths) {
  const projectRootDir = resolve(__dirname)
  const keys = Object.keys(paths)
  const entries = keys.map((k, i) => {
    return {
      find: k,
      replacement: resolve(projectRootDir, paths[k])
    }
  })

  return alias({ entries })
}
