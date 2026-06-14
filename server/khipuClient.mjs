const KHIPU_PAYMENTS_URL = 'https://payment-api.khipu.com/v2/payments'

export function createKhipuClient({ receiverId, secret }) {
  function assertConfigured() {
    if (!receiverId || !secret) {
      const err = new Error('Khipu no está configurado en el servidor.')
      err.code = 'KHIPU_NOT_CONFIGURED'
      throw err
    }
  }

  function authHeader() {
    assertConfigured()
    const token = Buffer.from(`${receiverId}:${secret}`, 'utf8').toString('base64')
    return `Basic ${token}`
  }

  async function createPayment(payload) {
    assertConfigured()

    const response = await fetch(KHIPU_PAYMENTS_URL, {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    let data
    try {
      data = await response.json()
    } catch {
      data = null
    }

    return { ok: response.ok, status: response.status, data }
  }

  async function getPayment(paymentId) {
    assertConfigured()

    const response = await fetch(`${KHIPU_PAYMENTS_URL}/${encodeURIComponent(paymentId)}`, {
      method: 'GET',
      headers: {
        Authorization: authHeader(),
        Accept: 'application/json',
      },
    })

    let data
    try {
      data = await response.json()
    } catch {
      data = null
    }

    return { ok: response.ok, status: response.status, data }
  }

  return { createPayment, getPayment }
}
