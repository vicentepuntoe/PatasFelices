import express from 'express'
import { createCorsMiddleware } from './middleware/cors.mjs'
import { createRateLimiter } from './middleware/rateLimit.mjs'
import { createDonationsRouter } from './routes/donations.mjs'
import { createKhipuRouter } from './routes/khipu.mjs'

export function createApp(config, khipu, donations) {
  const app = express()
  app.set('trust proxy', 1)

  app.use(createCorsMiddleware(config.allowedOrigins))
  app.use(express.json({ limit: '16kb' }))

  const paymentRateLimit = createRateLimiter({ windowMs: 60_000, max: 15 })

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      khipuConfigured: config.khipuConfigured,
      donationsLive: donations.configured,
    })
  })

  app.use('/api/donations', createDonationsRouter(donations))
  app.use('/api/khipu', paymentRateLimit, createKhipuRouter(config, khipu, donations))

  app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.' })
  })

  return app
}
