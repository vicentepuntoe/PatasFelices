import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Plugin en JS puro (tipos en server/vitePluginApi.mjs.d.ts no resuelven en todos los TS)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — módulo .mjs del servidor
import { patasfelicesApiDevPlugin } from './server/vitePluginApi.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), patasfelicesApiDevPlugin()],
})
