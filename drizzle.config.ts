import { defineConfig } from 'drizzle-kit';

require('dotenv').config();

export default defineConfig({
    schema: './src/database/schema/schema.ts',
    dialect: 'postgresql',
    out: './drizzle',
    dbCredentials: {
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_SCHEMA || '',
        ssl: false,
    },
});
