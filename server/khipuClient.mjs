import querystring from 'node:querystring'
import {
  bodyTuplesToForm,
  buildKhipuBodyTuples,
  buildKhipuQueryTuples,
  signKhipuRequest,
} from './khipuSign.mjs'

const DEFAULT_KHIPU_API_BASE = 'https://khipu.com/api/2.0'

export function createKhipuClient({
  receiverId,
  secret,
  apiBaseUrl = DEFAULT_KHIPU_API_BASE,
}) {
  const apiBase = apiBaseUrl.replace(/\/$/, '')

  function assertConfigured() {
    if (!receiverId || !secret) {
      const err = new Error('Khipu no está configurado en el servidor.')
      err.code = 'KHIPU_NOT_CONFIGURED'
      throw err
    }
  }

  function endpointPath(suffix) {
    const normalized = suffix.startsWith('/') ? suffix : `/${suffix}`
    return `${apiBase}${normalized}`
  }

  async function request({ method, suffix, body, query }) {
    assertConfigured()

    const requestUrl = endpointPath(suffix)
    const pathForFetch = requestUrl.replace(/^https?:\/\/[^/]+/, '')
    const bodyTuples = buildKhipuBodyTuples(body)
    const queryTuples = buildKhipuQueryTuples(query)
    const hash = signKhipuRequest({
      method,
      requestUrl,
      secret,
      queryTuples,
      bodyTuples,
    })

    const headers = {
      Authorization: `${receiverId}:${hash}`,
      Accept: 'application/json',
    }

    let fetchBody
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      fetchBody = bodyTuples.length ? bodyTuplesToForm(bodyTuples) : ''
    }

    let fetchPath = pathForFetch
    if (query && Object.keys(query).length > 0) {
      fetchPath += `?${querystring.stringify(query)}`
    }

    const origin = new URL(requestUrl).origin
    const response = await fetch(`${origin}${fetchPath}`, {
      method,
      headers,
      body: fetchBody,
    })

    let data
    try {
      data = await response.json()
    } catch {
      data = null
    }

    return { ok: response.ok, status: response.status, data }
  }

  async function createPayment(payload) {
    return request({
      method: 'POST',
      suffix: '/payments',
      body: {
        ...payload,
        notify_api_version: payload.notify_api_version ?? '3.0',
      },
    })
  }

  async function getPayment(paymentId) {
    const id = String(paymentId ?? '').trim()
    return request({
      method: 'GET',
      suffix: `/payments/${id}`,
    })
  }

  return { createPayment, getPayment }
}
