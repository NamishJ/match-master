/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Grab the base from an environment variable (with a fallback)
const base = process.env.NODE_ENV === 'production' ? '/match-master' : '/';

export default defineConfig({
  server: {
    hmr: false
  }, 
  base: '/match-master/',
  plugins: [react()],
})
