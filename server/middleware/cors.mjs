export function createCorsMiddleware(allowedOrigins) {
  const allowed = new Set(allowedOrigins)

  return function corsMiddleware(req, res, next) {
    const origin = req.headers.origin

    if (origin && allowed.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Vary', 'Origin')
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }

    next()
  }
}
