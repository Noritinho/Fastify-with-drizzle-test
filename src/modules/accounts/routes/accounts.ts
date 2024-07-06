import { FastifyInstance } from 'fastify';

import { AccountsService } from '../services/accounts.service';
import { AccountsController } from '../controllers/accounts.controller';

export async function accountsRoutes(app: FastifyInstance) {
  const accountsController = new AccountsController(new AccountsService());

  app.get('/', accountsController.findAllAccounts.bind(accountsController));
  app.get('/:id', accountsController.findOneAccount.bind(accountsController));
  app.get(
    '/users/:id',
    accountsController.findUserAccounts.bind(accountsController)
  );
  app.get(
    '/users/:id/total',
    accountsController.findUserTotalAccountValue.bind(accountsController)
  );

  app.post(
    '/users/:id',
    accountsController.createAccount.bind(accountsController)
  );

  app.put('/:id', accountsController.updateAccount.bind(accountsController));

  app.delete('/:id', accountsController.deleteAccount.bind(accountsController));
}
