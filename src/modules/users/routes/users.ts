import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';

import * as schema from '../../../database/schema/schema';
import { createUserSchema } from '../dto/create-user.dto';
import { updateUserSchema } from '../dto/update-user.dto';
import { db } from '../../../database/database.config';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const users = await db.query.users.findMany();
    return users;
  });

  app.get<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;

    const users = await db.query.users.findMany({
      where: eq(schema.users.id, id),
    });
    return users;
  });

  app.post('/', async (request) => {
    const { username, email, password } = createUserSchema.parse(
      await request.body
    );
    await db
      .insert(schema.users)
      .values({ username: username, email: email, password: password });
  });

  app.put<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;
    const user = updateUserSchema.parse(await request.body);
    await db.update(schema.users).set(user).where(eq(schema.users.id, id));
  });

  app.delete<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;

    await db.delete(schema.users).where(eq(schema.users.id, id));
  });
}
