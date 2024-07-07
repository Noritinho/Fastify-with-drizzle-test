import { FastifyInstance } from 'fastify';

import { usersController } from '../controllers/users.controller';

export async function usersRoutes(app: FastifyInstance) {
  const { findAllUsers, findOneUser, createUser, updateUser, deleteUser } =
    usersController;

  app.get('/', findAllUsers);

  app.get('/:id', findOneUser);

  app.post('/', createUser);

  app.put('/:id', updateUser);

  app.delete('/:id', deleteUser);
}
