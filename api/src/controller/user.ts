import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '../model/schema'
import type { UserInfo } from '../type'
import path from 'path'

const sqlite = new Database(path.resolve(__dirname, '../db/arcBlock.db'), { fileMustExist: true })
const db = drizzle(sqlite)

export const getUserInfo = async (id: string) => {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
  return user
}

export const updateUserInfo = async (userInfo: UserInfo) => {
  const { name, phone, email, avatar, id, bio } = userInfo
  const existUser = await getUserInfo(id)
  if (existUser) {
    await db
      .update(schema.users)
      .set({ name, phone, email, avatar, bio })
      .where(eq(schema.users.id, id))
  }
  else {
    await db
      .insert(schema.users)
      .values({ id, name, phone, email, avatar, bio })
  }
}
