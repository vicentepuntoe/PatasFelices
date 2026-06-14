import 'dotenv/config'
import { createPatasFelicesApi } from './bootstrap.mjs'

const { app, config } = createPatasFelicesApi()

app.listen(config.port, () => {
  console.log(`API PatasFelices escuchando en http://localhost:${config.port}`)
  if (!config.khipuConfigured) {
    console.warn('Khipu: faltan KHIPU_RECEIVER_ID o KHIPU_SECRET en .env')
  }
})
