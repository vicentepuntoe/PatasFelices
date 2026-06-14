import 'dotenv/config'
import { createDonationStore } from './donations/store.mjs'
import { loadConfig } from './config.mjs'
import { createKhipuClient } from './khipuClient.mjs'
import { createApp } from './app.mjs'

export function createPatasFelicesApi() {
  const config = loadConfig()
  const khipu = createKhipuClient({
    receiverId: config.receiverId,
    secret: config.secret,
    apiBaseUrl: config.khipuApiBaseUrl,
  })
  const donations = createDonationStore(config)
  const app = createApp(config, khipu, donations)
  return { app, config, donations }
}
