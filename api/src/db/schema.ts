import { pgTable, text, char } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  username: char({ length: 30 }).primaryKey(),
  password: text().notNull(),
  token: text(),
  email: text().notNull().unique(),
});
