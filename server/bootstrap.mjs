import { loadConfig } from './config.mjs'
import { createKhipuClient } from './khipuClient.mjs'
import { createApp } from './app.mjs'

export function createPatasFelicesApi() {
  const config = loadConfig()
  const khipu = createKhipuClient({
    receiverId: config.receiverId,
    secret: config.secret,
  })
  const app = createApp(config, khipu)
  return { app, config }
}
