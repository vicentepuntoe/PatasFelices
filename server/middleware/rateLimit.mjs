export function createRateLimiter({ windowMs = 60_000, max = 20 } = {}) {
  const hits = new Map()

  return function rateLimit(req, res, next) {
    const key = req.ip || req.socket?.remoteAddress || 'unknown'
    const now = Date.now()
    const entry = hits.get(key)

    if (!entry || now - entry.start >= windowMs) {
      hits.set(key, { start: now, count: 1 })
      next()
      return
    }

    entry.count += 1
    if (entry.count > max) {
      res.status(429).json({
        error: 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
      })
      return
    }

    next()
  }
}
