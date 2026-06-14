const DEFAULT_KHIPU_API_BASE = 'https://khipu.com/api/2.0'

export function createKhipuClient({
  receiverId,
  secret,
  apiBaseUrl = DEFAULT_KHIPU_API_BASE,
}) {
  const paymentsUrl = `${apiBaseUrl}/payments`
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

    const response = await fetch(paymentsUrl, {
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

    const response = await fetch(`${paymentsUrl}/${encodeURIComponent(paymentId)}`, {
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
