import { drizzle } from 'drizzle-orm/node-postgres';
import { FastifyInstance } from 'fastify';
import { and, eq, sum } from 'drizzle-orm';

import { postgresPool } from '../../../database/database.config';
import * as schema from '../../../database/schema/schema';
import { createAccountSchema } from '../dto/create-account.dto';
import { updateAccountSchema } from '../dto/update-account.dto';

const db = drizzle(postgresPool, { schema });

export async function accountsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const accounts = await db.query.accounts.findMany();
    return accounts;
  });

  app.get<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;

    const accounts = await db.query.accounts.findMany({
      where: eq(schema.accounts.id, id),
    });

    return accounts;
  });

  app.get<{ Params: { id: number } }>('/users/:id', async (request) => {
    const { id } = request.params;

    const accounts = await db.query.accounts.findMany({
      where: eq(schema.accounts.userId, id),
    });

    return accounts;
  });

  app.get<{ Params: { id: number } }>('/users/:id/total', async (request) => {
    const { id } = request.params;

    const accountsReceivable = await db
      .select({
        value: sum(schema.accounts.value),
      })
      .from(schema.accounts)
      .where(
        and(
          eq(schema.accounts.userId, id),
          eq(schema.accounts.account_type, 'RECEIVABLE')
        )
      );

    const accountsPayable = await db
      .select({
        value: sum(schema.accounts.value),
      })
      .from(schema.accounts)
      .where(
        and(
          eq(schema.accounts.userId, id),
          eq(schema.accounts.account_type, 'PAYABLE')
        )
      );

    if (!accountsReceivable[0].value && accountsPayable[0].value) {
      return accountsPayable[0].value;
    }

    if (accountsReceivable[0].value && !accountsPayable[0].value) {
      return accountsReceivable[0].value;
    }

    return accountsReceivable[0].value && accountsPayable[0].value
      ? parseFloat(accountsReceivable[0].value) -
          parseFloat(accountsPayable[0].value)
      : 'Erro';
  });

  app.post<{ Params: { id: number } }>('/users/:id', async (request) => {
    const { id } = request.params;

    const { description, value, account_type } = createAccountSchema.parse(
      await request.body
    );

    await db.insert(schema.accounts).values({
      userId: id,
      description: description,
      value: value,
      account_type: account_type,
    });
  });

  app.put<{ Params: { id: number } }>('/id', async (request) => {
    const { id } = request.params;
    const account = updateAccountSchema.parse(await request.body);
    await db
      .update(schema.accounts)
      .set(account)
      .where(eq(schema.accounts.id, id));
  });

  app.delete<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;

    await db.delete(schema.accounts).where(eq(schema.accounts.id, id));
  });
}
