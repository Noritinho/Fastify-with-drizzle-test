import { FastifyReply, FastifyRequest } from 'fastify';

import { AccountsService } from '../services/accounts.service';
import { createAccountSchema } from '../dto/create-account.dto';
import { updateAccountSchema } from '../dto/update-account.dto';

export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  async findAllAccounts(request: FastifyRequest, reply: FastifyReply) {
    const findAllAccounts = await this.accountsService.findAllAccounts();
    return await reply.send(findAllAccounts);
  }

  async findOneAccount(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const findOneAccount = await this.accountsService.findOneAccount(id);
    return await reply.send(findOneAccount);
  }

  async findUserAccounts(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const findUserAccounts = await this.accountsService.findUserAccounts(id);

    return await reply.send(findUserAccounts);
  }

  async findUserTotalAccountValue(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const findUserTotalAccountValue =
      await this.accountsService.findUserTotalAccountValue(id);

    return await reply.send(findUserTotalAccountValue);
  }

  async createAccount(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const account = createAccountSchema.parse(request.body);
    const createAccount = await this.accountsService.createAccount(id, account);

    return await reply.send(createAccount);
  }

  async updateAccount(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const account = updateAccountSchema.parse(request.body);
    const updateAccount = await this.accountsService.updateAccount(id, account);

    return await reply.send(updateAccount);
  }

  async deleteAccount(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const deleteAccount = await this.accountsService.deleteAccount(id);

    return reply.send(deleteAccount);
  }
}
