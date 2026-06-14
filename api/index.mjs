import 'dotenv/config'
import { createPatasFelicesApi } from '../server/bootstrap.mjs'

const { app } = createPatasFelicesApi()

export default app
