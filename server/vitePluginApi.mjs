import 'dotenv/config'

let apiApp = null

async function getApiApp() {
  if (!apiApp) {
    const { createPatasFelicesApi } = await import('./bootstrap.mjs')
    const { app } = createPatasFelicesApi()
    apiApp = app
  }
  return apiApp
}

/** Monta Express en /api durante `vite` (un solo puerto, sin proxy a 3001). */
export function patasfelicesApiDevPlugin() {
  return {
    name: 'patasfelices-api-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        if (!path.startsWith('/api')) {
          next()
          return
        }

        void getApiApp()
          .then((app) => {
            app(req, res, next)
          })
          .catch((err) => {
            next(err)
          })
      })
    },
  }
}
