import { FastifyReply, FastifyRequest } from 'fastify';

import { UsersService } from '../services/users.service';
import { createUserSchema } from '../dto/create-user.dto';
import { updateUserSchema } from '../dto/update-user.dto';
import { wrapControllerMethods } from '../../../commom/wrappers/controllers.wrapper';

class UsersController {
  constructor(private usersService: UsersService) {}

  async findAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const findAllUsers = await this.usersService.findAllUsers();
    return await reply.send(findAllUsers);
  }

  async findOneUser(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const findOneUser = await this.usersService.findOneUser(id);
    return await reply.send(findOneUser);
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const user = createUserSchema.parse(request.body);
    const createUser = await this.usersService.createUser(user);

    return await reply.send(createUser);
  }

  async updateUser(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const user = updateUserSchema.parse(request.body);
    const updateUser = await this.usersService.updateUser(id, user);

    return await reply.send(updateUser);
  }

  async deleteUser(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const deleteUser = await this.usersService.deleteUser(id);

    return reply.send(deleteUser);
  }
}

export const usersController = wrapControllerMethods(
  new UsersController(new UsersService())
);
