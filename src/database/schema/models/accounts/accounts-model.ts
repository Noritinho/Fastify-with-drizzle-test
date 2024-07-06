import {
  pgTable,
  serial,
  timestamp,
  integer,
  varchar,
  real,
} from 'drizzle-orm/pg-core';

import { users } from '../../schema';

export const accountsModel = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  description: varchar('description', { length: 256 }),
  value: real('value'),
  account_type: varchar('account_type', { enum: ['PAYABLE', 'RECEIVABLE'] }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
