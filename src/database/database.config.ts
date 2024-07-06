import { drizzle } from 'drizzle-orm/node-postgres';

import { postgresPool } from './postgres/postgres.config';
import * as schema from '../database/schema/schema';

export const db = drizzle(postgresPool, { schema });
