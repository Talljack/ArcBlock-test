import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  phone: text('phone'),
  email: text('email'),
  avatar: text('avatar'),
  birthday: integer('birthday', { mode: 'number' }),
  bio: text('bio'),
})
