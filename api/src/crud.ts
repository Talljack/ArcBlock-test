import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { users } from './model/schema'
import type { UserInfo } from './type'

const sqlite = new Database('api/src/db/arcBlock.db', { fileMustExist: true })
const db = drizzle(sqlite)

export const getUserInfo = async (id: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
  return user
}

export const updateUserInfo = async (userInfo: UserInfo) => {
  const { name, phone, email, avatar, id, bio } = userInfo
  const existUser = await getUserInfo(id)
  if (existUser) {
    await db
      .update(users)
      .set({ name, phone, email, avatar, bio })
      .where(eq(users.id, id))
  }
  else {
    await db
      .insert(users)
      .values({ id, name, phone, email, avatar, bio })
  }
}
