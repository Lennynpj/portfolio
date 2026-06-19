import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Évite les doublons de React (R3F/drei en dev) -> "Invalid hook call".
    dedupe: ['react', 'react-dom'],
  },
})
