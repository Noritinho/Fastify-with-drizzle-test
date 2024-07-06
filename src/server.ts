import fastify from 'fastify';
import { usersRoutes } from './modules/users/routes/users';
import { accountsRoutes } from './modules/accounts/routes/accounts';

const server = fastify();

server.register(usersRoutes, {
  prefix: 'users',
});
server.register(accountsRoutes, {
  prefix: 'accounts',
});

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
