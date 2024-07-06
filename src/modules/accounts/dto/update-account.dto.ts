import z from 'zod';

import { createAccountSchema } from './create-account.dto';

export const updateAccountSchema = createAccountSchema.partial();

export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;
