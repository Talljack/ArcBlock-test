import { eq } from "drizzle-orm";
import { drizzle, BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import * as schema from "./schema";
import type { UserInfo } from "./type";

const sqlite: Database = new Database("db/arcBlock.db", { create: true });
const db: BunSQLiteDatabase<typeof schema> = drizzle(sqlite, { schema });

migrate(db, {migrationsFolder: 'db/drizzle'});


export const getUserInfo = async (id: string) => {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
  return user
}

export const updateUserInfo = async (userInfo: UserInfo) => {
  const { name, phone, email, avatar, id, birthday, bio } = userInfo
  const existUser = await getUserInfo(id)
  console.log('exist', existUser, userInfo)
  if (existUser) {
    await db
    .update(schema.users)
    .set({ name, phone, email, avatar, birthday, bio })
    .where(eq(schema.users.id, id))
  } else {
    await db
    .insert(schema.users)
    .values({id, name, phone, email, avatar, birthday, bio })
  }
}
