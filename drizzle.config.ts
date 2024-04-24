import type { Config } from 'drizzle-kit'

export default {
  schema: 'api/src/model/schema.ts',
  out: 'api/src/db/drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'api/src/db/arcBlock.db',
  },
} satisfies Config
