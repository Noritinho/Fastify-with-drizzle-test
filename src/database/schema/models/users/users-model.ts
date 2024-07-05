import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersModel = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 30 }),
  email: varchar('email', { length: 256 }),
  password: varchar('password', { length: 30 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
