import { FastifyInstance } from 'fastify';

import { createAccountSchema } from '../dto/create-account.dto';
import { updateAccountSchema } from '../dto/update-account.dto';
import { AccountsService } from '../services/accounts.service';

export async function accountsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return AccountsService.prototype.findAllAccounts();
  });

  app.get<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;

    return AccountsService.prototype.findOneAccount(id);
  });

  app.get<{ Params: { id: number } }>('/users/:id', async (request) => {
    const { id } = request.params;

    return AccountsService.prototype.findUserAccounts(id);
  });

  app.get<{ Params: { id: number } }>('/users/:id/total', async (request) => {
    const { id } = request.params;

    return AccountsService.prototype.findUserTotalAccountValue(id);
  });

  app.post<{ Params: { id: number } }>('/users/:id', async (request) => {
    const { id } = request.params;
    const account = createAccountSchema.parse(request.body);

    return AccountsService.prototype.createAccount(id, account);
  });

  app.put<{ Params: { id: number } }>('/id', async (request) => {
    const { id } = request.params;
    const account = updateAccountSchema.parse(request);

    return AccountsService.prototype.updateAccount(id, account);
  });

  app.delete<{ Params: { id: number } }>('/:id', async (request) => {
    const { id } = request.params;

    return AccountsService.prototype.deleteAccount(id);
  });
}
