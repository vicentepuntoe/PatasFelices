import { Router } from 'express'
import { registerFromKhipuNotifyBody, registerConfirmedPayment } from '../donations/register.mjs'
import { validateCreatePaymentBody } from '../validatePaymentInput.mjs'

function mapKhipuErrorStatus(upstreamStatus) {
  if (upstreamStatus >= 400 && upstreamStatus < 500) return 502
  return 503
}

function publicErrorMessage(err) {
  if (err?.code === 'KHIPU_NOT_CONFIGURED') {
    return 'Los pagos no están disponibles en este momento. Intenta más tarde.'
  }
  return 'No pudimos iniciar el pago. Intenta de nuevo en unos minutos.'
}

export function createKhipuRouter(config, khipu, donations) {
  const router = Router()

  router.post('/payments', async (req, res) => {
    try {
      const validated = validateCreatePaymentBody(req.body, {
        minAmount: config.minAmount,
        maxAmount: config.maxAmount,
      })

      if (!validated.ok) {
        res.status(validated.status).json({ error: validated.error })
        return
      }

      const { amount, donorName, message, subject } = validated.value

      const payload = {
        subject,
        amount,
        currency: 'CLP',
        return_url: `${config.appUrl}/donacion/gracias`,
        cancel_url: `${config.appUrl}/#donar`,
        body: message || 'Gracias por apoyar a nuestros rescatados.',
        custom: JSON.stringify({
          donorName: donorName || 'Anónimo',
          source: 'patasfelices-web',
        }),
      }

      if (config.notifyUrl) {
        payload.notify_url = config.notifyUrl
      }

      const result = await khipu.createPayment(payload)

      if (!result.ok) {
        console.error('Khipu create payment failed', {
          status: result.status,
          paymentError: result.data?.message ?? result.data?.error ?? 'unknown',
        })
        res.status(mapKhipuErrorStatus(result.status)).json({
          error: 'No pudimos iniciar el pago con Khipu. Revisa el monto e inténtalo de nuevo.',
        })
        return
      }

      const data = result.data ?? {}
      res.json({
        paymentId: data.payment_id,
        paymentUrl: data.payment_url,
        simplifiedTransferUrl: data.simplified_transfer_url,
      })
    } catch (err) {
      console.error('Create payment error', err instanceof Error ? err.message : err)
      res.status(503).json({ error: publicErrorMessage(err) })
    }
  })

  router.post('/notify', async (req, res) => {
    try {
      const outcome = await registerFromKhipuNotifyBody(donations, khipu, req.body ?? {})
      if (outcome.registered) {
        console.info('Donation registered from webhook', {
          paymentId: outcome.donation?.khipuPaymentId,
        })
      }
    } catch (err) {
      console.error('Webhook register error', err instanceof Error ? err.message : err)
    }

    res.status(200).json({ received: true })
  })

  router.post('/payments/:paymentId/register', async (req, res) => {
    const paymentId = String(req.params.paymentId ?? '').trim()
    if (!paymentId || paymentId.length > 64) {
      res.status(400).json({ error: 'Identificador de pago inválido.' })
      return
    }

    try {
      const outcome = await registerConfirmedPayment(donations, khipu, paymentId)
      if (!outcome.registered) {
        res.status(409).json({
          error: 'El pago aún no está confirmado en Khipu.',
          reason: outcome.reason,
        })
        return
      }
      res.json({ ok: true, donation: outcome.donation })
    } catch (err) {
      console.error('Register donation error', err instanceof Error ? err.message : err)
      res.status(503).json({ error: 'No pudimos registrar la donación.' })
    }
  })

  router.get('/payments/:paymentId', async (req, res) => {
    const paymentId = String(req.params.paymentId ?? '').trim()
    if (!paymentId || paymentId.length > 64) {
      res.status(400).json({ error: 'Identificador de pago inválido.' })
      return
    }

    try {
      const result = await khipu.getPayment(paymentId)

      if (!result.ok) {
        res.status(404).json({ error: 'No encontramos ese pago.' })
        return
      }

      const data = result.data ?? {}
      res.json({
        paymentId: data.payment_id,
        status: data.status,
        amount: data.amount,
        currency: data.currency,
      })
    } catch (err) {
      console.error('Get payment error', err instanceof Error ? err.message : err)
      res.status(503).json({ error: publicErrorMessage(err) })
    }
  })

  return router
}
