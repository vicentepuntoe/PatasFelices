import { createClient } from '@supabase/supabase-js'

function mapRow(row) {
  return {
    id: row.id,
    khipuPaymentId: row.khipu_payment_id,
    amount: row.amount,
    currency: row.currency,
    donorLabel: row.donor_label,
    message: row.message ?? undefined,
    khipuStatus: row.khipu_status,
    createdAt: row.created_at,
  }
}

export function createSupabaseDonationStore({ url, serviceRoleKey }) {
  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  return {
    configured: true,
    async upsertFromKhipuPayment(payment) {
      const row = {
        khipu_payment_id: payment.paymentId,
        amount: payment.amount,
        currency: payment.currency || 'CLP',
        donor_label: payment.donorLabel,
        message: payment.message ?? null,
        khipu_status: payment.status,
      }

      const { data, error } = await supabase
        .from('donations')
        .upsert(row, { onConflict: 'khipu_payment_id' })
        .select('*')
        .single()

      if (error) throw error
      return mapRow(data)
    },
    async listPublic({ limit = 40 } = {}) {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      const donations = (data ?? []).map(mapRow)
      const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
      return {
        count: donations.length,
        totalAmount,
        donations,
      }
    },
    async stats() {
      const { count, error: countError } = await supabase
        .from('donations')
        .select('*', { count: 'exact', head: true })

      if (countError) throw countError

      const { data, error } = await supabase.from('donations').select('amount')
      if (error) throw error
      const totalAmount = (data ?? []).reduce((sum, row) => sum + row.amount, 0)

      return { count: count ?? 0, totalAmount }
    },
  }
}

const globalKey = Symbol.for('patasfelices.memoryDonations')

function getMemoryRows() {
  if (!globalThis[globalKey]) {
    globalThis[globalKey] = []
  }
  return globalThis[globalKey]
}

export function createMemoryDonationStore() {
  return {
    configured: false,
    async upsertFromKhipuPayment(payment) {
      const rows = getMemoryRows()
      const existing = rows.find((r) => r.khipuPaymentId === payment.paymentId)
      const record = {
        id: existing?.id ?? crypto.randomUUID(),
        khipuPaymentId: payment.paymentId,
        amount: payment.amount,
        currency: payment.currency || 'CLP',
        donorLabel: payment.donorLabel,
        message: payment.message,
        khipuStatus: payment.status,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
      }
      if (existing) {
        Object.assign(existing, record)
        return record
      }
      rows.unshift(record)
      return record
    },
    async listPublic({ limit = 40 } = {}) {
      const donations = getMemoryRows().slice(0, limit)
      const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
      return { count: donations.length, totalAmount, donations }
    },
    async stats() {
      const rows = getMemoryRows()
      return {
        count: rows.length,
        totalAmount: rows.reduce((sum, d) => sum + d.amount, 0),
      }
    },
  }
}

export function createDonationStore(config) {
  if (config.supabaseUrl && config.supabaseServiceRoleKey) {
    return createSupabaseDonationStore({
      url: config.supabaseUrl,
      serviceRoleKey: config.supabaseServiceRoleKey,
    })
  }
  return createMemoryDonationStore()
}
