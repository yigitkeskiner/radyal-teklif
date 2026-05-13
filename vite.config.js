import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Radyal Teklif - v1.0
export default defineConfig({
  plugins: [react()],
  base: '/radyal-teklif/',
})
