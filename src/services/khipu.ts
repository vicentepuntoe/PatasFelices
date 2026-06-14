import type { KhipuPaymentResponse } from '../types/donation'

export type CreateDonationPaymentInput = {
  amount: number
  donorName?: string
  message?: string
}

export async function createKhipuPayment(
  input: CreateDonationPaymentInput,
): Promise<KhipuPaymentResponse> {
  const response = await fetch('/api/khipu/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: input.amount,
      donorName: input.donorName,
      message: input.message,
      subject: 'Donación PatasFelices',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error ?? 'No se pudo iniciar el pago.')
  }

  return data as KhipuPaymentResponse
}
