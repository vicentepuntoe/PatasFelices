const DONOR_NAME_MAX = 80
const MESSAGE_MAX = 500
const SUBJECT_MAX = 200

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().replace(/\s+/g, ' ')
  if (!trimmed) return undefined
  return trimmed.slice(0, maxLength)
}

export function validateCreatePaymentBody(body, { minAmount, maxAmount }) {
  const amountRaw = body?.amount
  const parsedAmount =
    typeof amountRaw === 'number' ? amountRaw : Number(String(amountRaw ?? '').replace(/\D/g, ''))

  if (!Number.isFinite(parsedAmount) || parsedAmount < minAmount) {
    return {
      ok: false,
      status: 400,
      error: `El monto mínimo de donación es $${minAmount.toLocaleString('es-CL')} CLP.`,
    }
  }

  if (parsedAmount > maxAmount) {
    return {
      ok: false,
      status: 400,
      error: `El monto máximo por donación es $${maxAmount.toLocaleString('es-CL')} CLP.`,
    }
  }

  const donorName = cleanText(body?.donorName, DONOR_NAME_MAX)
  const message = cleanText(body?.message, MESSAGE_MAX)
  const subjectOverride = cleanText(body?.subject, SUBJECT_MAX)

  const subject =
    subjectOverride ||
    `Donación PatasFelices${donorName ? ` — ${donorName}` : ''}`.slice(0, SUBJECT_MAX)

  return {
    ok: true,
    value: {
      amount: Math.round(parsedAmount),
      donorName,
      message,
      subject,
    },
  }
}
