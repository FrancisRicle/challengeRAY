import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js'
import { usersTable } from './schema.js';
import { eq, or } from 'drizzle-orm';
export const db = drizzle(process.env.DATABASE_URL as string);
export async function createUser(user: { username: string, email: string, password: string, token?: string }) {
  await db.insert(usersTable).values(user)
}
export async function retrieveToken(user: string, password: string): Promise<{ token: string | null, username: string | null } | null> {
  const [result] = await db.select({ token: usersTable.token, password: usersTable.password, username: usersTable.username }).from(usersTable)
    .where(
      or(
        eq(usersTable.email, user),
        eq(usersTable.username, user)
      )
    )
  if (!result) {
    return null;
  }
  if (result.password == password) {
    return {
      token: result.token,
      username: result.username
    };
  }
  return null;
}

export async function updateToken(username: string, token: string) {
  await db.update(usersTable).set({ token }).where(eq(usersTable.username, username))
}

export async function getToken(username: string) {
  const [res] = await db.select({ token: usersTable.token }).from(usersTable).where(eq(usersTable.username, username))
  return res.token;
}
export async function destroyToken(username: string) {
  await db.update(usersTable).set({ token: null }).where(eq(usersTable.username, username))
}
