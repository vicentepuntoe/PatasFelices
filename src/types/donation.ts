export type DonationPreset = {
  amount: number
  label: string
  impact: string
}

export type TransparencyEntry = {
  id: string
  date: string
  donorLabel: string
  amount: number
  allocation: string
  receiptNote: string
}

export type KhipuPaymentResponse = {
  paymentId: string
  paymentUrl: string
  simplifiedTransferUrl?: string
}

export type KhipuPaymentStatusResponse = {
  paymentId: string
  status: string
  amount?: number
  currency?: string
}
