import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const PORT = process.env.KHIPU_API_PORT ?? 3001

const receiverId = process.env.KHIPU_RECEIVER_ID
const secret = process.env.KHIPU_SECRET
const appUrl = process.env.APP_URL ?? 'http://localhost:5173'

app.use(cors({ origin: true }))
app.use(express.json())

function khipuAuthHeader() {
  if (!receiverId || !secret) {
    throw new Error('KHIPU_RECEIVER_ID y KHIPU_SECRET deben estar configurados en .env')
  }
  const token = Buffer.from(`${receiverId}:${secret}`).toString('base64')
  return `Basic ${token}`
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    khipuConfigured: Boolean(receiverId && secret),
  })
})

app.post('/api/khipu/payments', async (req, res) => {
  try {
    const { amount, subject, donorName, message } = req.body ?? {}

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount < 1000) {
      res.status(400).json({
        error: 'El monto mínimo de donación es $1.000 CLP.',
      })
      return
    }

    const paymentSubject =
      subject?.trim() ||
      `Donación PatasFelices${donorName ? ` — ${donorName}` : ''}`

    const body = {
      subject: paymentSubject.slice(0, 200),
      amount: Math.round(parsedAmount),
      currency: 'CLP',
      return_url: `${appUrl}/donacion/gracias`,
      cancel_url: `${appUrl}/#donar`,
      notify_url: process.env.KHIPU_NOTIFY_URL || undefined,
      body: message?.trim()?.slice(0, 500) || 'Gracias por apoyar a nuestros rescatados.',
      custom: JSON.stringify({
        donorName: donorName?.trim() || 'Anónimo',
        source: 'patasfelices-web',
      }),
    }

    const response = await fetch('https://payment-api.khipu.com/v2/payments', {
      method: 'POST',
      headers: {
        Authorization: khipuAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Khipu error:', data)
      res.status(response.status).json({
        error: data?.message || 'No pudimos iniciar el pago con Khipu.',
        details: data,
      })
      return
    }

    res.json({
      paymentId: data.payment_id,
      paymentUrl: data.payment_url,
      simplifiedTransferUrl: data.simplified_transfer_url,
    })
  } catch (err) {
    console.error(err)
    const message =
      err instanceof Error ? err.message : 'Error interno al crear el pago.'
    res.status(500).json({ error: message })
  }
})

app.listen(PORT, () => {
  console.log(`API PatasFelices escuchando en http://localhost:${PORT}`)
})
