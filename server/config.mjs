const DEFAULT_APP_URL = 'http://localhost:5173'
const DEFAULT_PORT = 3001
const DEFAULT_MIN_AMOUNT = 1000
const DEFAULT_MAX_AMOUNT = 5_000_000

function parsePositiveInt(value, fallback) {
  if (value === undefined || value === '') return fallback
  const parsed = Number.parseInt(String(value), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function resolveAppUrl() {
  const explicit = process.env.APP_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')

  const vercelUrl = process.env.VERCEL_URL?.trim()
  if (vercelUrl) return `https://${vercelUrl.replace(/\/$/, '')}`

  return DEFAULT_APP_URL
}

export function loadConfig() {
  const appUrl = resolveAppUrl()
  const port = parsePositiveInt(process.env.KHIPU_API_PORT, DEFAULT_PORT)
  const minAmount = parsePositiveInt(process.env.KHIPU_MIN_AMOUNT, DEFAULT_MIN_AMOUNT)
  const maxAmount = parsePositiveInt(process.env.KHIPU_MAX_AMOUNT, DEFAULT_MAX_AMOUNT)

  const receiverId = process.env.KHIPU_RECEIVER_ID?.trim() || ''
  const secret = process.env.KHIPU_SECRET?.trim() || ''
  const notifyUrl = process.env.KHIPU_NOTIFY_URL?.trim() || ''

  const allowedOrigins = new Set([
    appUrl,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ])

  const extraOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') ?? []
  for (const origin of extraOrigins) {
    const trimmed = origin.trim().replace(/\/$/, '')
    if (trimmed) allowedOrigins.add(trimmed)
  }

  return {
    appUrl,
    port,
    minAmount,
    maxAmount: Math.max(minAmount, maxAmount),
    receiverId,
    secret,
    notifyUrl,
    khipuConfigured: Boolean(receiverId && secret),
    allowedOrigins: [...allowedOrigins],
  }
}
