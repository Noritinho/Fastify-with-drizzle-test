import fastify from 'fastify';
import { usersRoutes } from './modules/users/routes/users';

const server = fastify();

server.register(usersRoutes, {
    prefix: 'users',
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
