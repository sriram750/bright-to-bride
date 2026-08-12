import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function studioDataPlugin(): Plugin {
  const jsonPath = path.resolve(__dirname, 'public/studio-data.json')
  return {
    name: 'studio-data-api',
    configureServer(server) {
      server.middlewares.use('/api/studio-data', (req, res, next) => {
        if (req.method === 'GET') {
          try {
            if (fs.existsSync(jsonPath)) {
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
              res.end(fs.readFileSync(jsonPath, 'utf-8'))
              return
            }
          } catch {}
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({}))
        } else if (req.method === 'POST' || req.method === 'PUT') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              fs.writeFileSync(jsonPath, body, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err: any) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: err?.message || 'Failed to save' }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), studioDataPlugin()],
  server: {
    host: true,
    allowedHosts: true
  }
})

