import crypto from 'node:crypto'
import querystring from 'node:querystring'

/** Orden de campos exigido por Khipu al firmar POST (API 2.0 Chile). */
export const KHIPU_BODY_FIELD_ORDER = [
  'amount',
  'bank_id',
  'body',
  'cancel_url',
  'collect_account_uuid',
  'confirm_timeout_date',
  'contract_url',
  'currency',
  'custom',
  'expires_date',
  'fixed_payer_personal_identifier',
  'integrator_fee',
  'mandatory_payment_method',
  'notify_api_version',
  'notify_url',
  'payer_email',
  'payer_name',
  'picture_url',
  'responsible_user_email',
  'return_url',
  'send_email',
  'send_reminders',
  'subject',
  'transaction_id',
]

export function buildKhipuBodyTuples(body) {
  if (!body) return []
  const tuples = []
  for (const field of KHIPU_BODY_FIELD_ORDER) {
    const value = body[field]
    if (value !== undefined && value !== null && value !== '') {
      tuples.push([field, value])
    }
  }
  return tuples
}

export function buildKhipuQueryTuples(query) {
  if (!query) return []
  return Object.keys(query)
    .sort()
    .map((key) => [encodeURIComponent(key), encodeURIComponent(String(query[key]))])
}

/**
 * Firma HMAC-SHA256 según cliente oficial Khipu (receiverId:hash en Authorization).
 * @see https://github.com/ivyhjk/khipu-client-nodejs
 */
export function signKhipuRequest({ method, requestUrl, secret, queryTuples, bodyTuples }) {
  const chunks = [method, encodeURIComponent(requestUrl)]

  for (const [key, value] of queryTuples ?? []) {
    chunks.push(`${key}=${value}`)
  }

  for (const [key, value] of bodyTuples ?? []) {
    chunks.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  }

  return crypto.createHmac('sha256', secret).update(chunks.join('&')).digest('hex')
}

export function bodyTuplesToForm(tuples) {
  const record = Object.fromEntries(tuples.map(([k, v]) => [k, String(v)]))
  return querystring.stringify(record)
}
