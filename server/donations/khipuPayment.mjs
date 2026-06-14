const CONFIRMED = new Set(['done', 'paid', 'completed'])

export function isKhipuPaymentConfirmedStatus(status) {
  if (typeof status !== 'string') return false
  return CONFIRMED.has(status.trim().toLowerCase())
}

export function parseKhipuCustom(custom) {
  if (!custom) return {}
  if (typeof custom === 'object') return custom
  if (typeof custom !== 'string') return {}
  try {
    return JSON.parse(custom)
  } catch {
    return {}
  }
}

export function donorLabelFromCustom(custom) {
  const data = parseKhipuCustom(custom)
  const name = typeof data.donorName === 'string' ? data.donorName.trim() : ''
  if (!name || name.toLowerCase() === 'anónimo' || name.toLowerCase() === 'anonimo') {
    return 'Donación anónima'
  }
  return name.slice(0, 80)
}
