import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://astridbonoan.github.io/AS_Casual_Restaurant.io/
export default defineConfig({
  base: '/AS_Casual_Restaurant.io/',
  plugins: [react(), tailwindcss()],
})
