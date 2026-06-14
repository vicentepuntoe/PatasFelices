import {
  donorLabelFromCustom,
  isKhipuPaymentConfirmedStatus,
} from './khipuPayment.mjs'

export async function registerConfirmedPayment(donations, khipu, paymentId) {
  const result = await khipu.getPayment(paymentId)
  if (!result.ok || !result.data) {
    return { registered: false, reason: 'not_found' }
  }

  const data = result.data
  const status = data.status ?? data.payment_status
  if (!isKhipuPaymentConfirmedStatus(status)) {
    return { registered: false, reason: 'not_confirmed', status }
  }

  const paymentIdValue = data.payment_id ?? paymentId
  const amount = Number(data.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    return { registered: false, reason: 'invalid_amount' }
  }

  const donorLabel = donorLabelFromCustom(data.custom)
  const message =
    typeof data.body === 'string' && data.body.trim()
      ? data.body.trim().slice(0, 500)
      : undefined

  const record = await donations.upsertFromKhipuPayment({
    paymentId: paymentIdValue,
    amount: Math.round(amount),
    currency: data.currency || 'CLP',
    donorLabel,
    message,
    status: String(status),
  })

  return { registered: true, donation: record }
}

export async function registerFromKhipuNotifyBody(donations, khipu, body) {
  const paymentId = body?.payment_id ?? body?.paymentId
  if (!paymentId) {
    return { registered: false, reason: 'missing_payment_id' }
  }

  const status = body?.status
  if (status && isKhipuPaymentConfirmedStatus(status)) {
    const amount = Number(body.amount)
    if (Number.isFinite(amount) && amount > 0) {
      const record = await donations.upsertFromKhipuPayment({
        paymentId: String(paymentId),
        amount: Math.round(amount),
        currency: body.currency || 'CLP',
        donorLabel: donorLabelFromCustom(body.custom),
        message:
          typeof body.body === 'string' ? body.body.trim().slice(0, 500) : undefined,
        status: String(status),
      })
      return { registered: true, donation: record }
    }
  }

  return registerConfirmedPayment(donations, khipu, String(paymentId))
}
