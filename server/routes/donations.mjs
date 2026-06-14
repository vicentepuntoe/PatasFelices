import { Router } from 'express'

export function createDonationsRouter(donations) {
  const router = Router()

  router.get('/', async (_req, res) => {
    try {
      const snapshot = await donations.listPublic({ limit: 50 })
      const stats = await donations.stats()
      res.json({
        live: donations.configured,
        count: stats.count,
        totalAmount: stats.totalAmount,
        donations: snapshot.donations,
      })
    } catch (err) {
      console.error('List donations error', err instanceof Error ? err.message : err)
      res.status(503).json({ error: 'No pudimos cargar las donaciones en vivo.' })
    }
  })

  return router
}
