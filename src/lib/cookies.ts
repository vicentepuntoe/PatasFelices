const CONSENT_STORAGE_KEY = 'pf-cookie-consent'

export type CookieConsentChoice = 'accepted' | 'rejected'

export function getCookieConsent(): CookieConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (value === 'accepted' || value === 'rejected') return value
    return null
  } catch {
    return null
  }
}

export function setCookieConsent(choice: CookieConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    /* ignore quota / private mode */
  }
}

export function hasAnsweredCookieConsent(): boolean {
  return getCookieConsent() !== null
}
