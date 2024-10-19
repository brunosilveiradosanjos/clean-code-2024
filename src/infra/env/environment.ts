import 'dotenv/config'
import { z } from 'zod'

const environment = z.object({
  NODE_ENV: z.enum(['prod', 'test', 'dev']).default('dev'),
  DATABASE_URL: z.string(),
  DATABASE_SCHEMA: z.string().default('public'),
  PORT: z.coerce.number().default(3000),
})

const _env = environment.safeParse(process.env)

if (_env.success === false) {
  console.log('👎🏽 Invalid environment variables', _env.error.format())
  throw new Error('👎🏽 Invalid environment variables')
}

export const env = _env.data
