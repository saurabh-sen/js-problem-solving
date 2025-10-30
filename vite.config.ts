import { defineConfig } from 'vite'

export default defineConfig({
  // Enable serving files from subdirectories
  server: {
    fs: {
      allow: ['..']
    }
  },
  // Handle TypeScript files
  esbuild: {
    target: 'es2020'
  },
  // Configure build for multiple entry points
  build: {
    rollupOptions: {
      input: {
        // Add your HTML files as entry points
        'getElementsByClassname': './getElementsByClassname/index.html',
        'getElementsByClassNameHeirarchy': './getElementsByClassNameHeirarchy/index.html',
        'promiseAll': './polyfillForPromiseCombinator/promiseAll/index.html',
        'questionRelatedToPromises': './polyfillForPromiseCombinator/questionRelatedToPromises/index.html'
      }
    }
  }
})
