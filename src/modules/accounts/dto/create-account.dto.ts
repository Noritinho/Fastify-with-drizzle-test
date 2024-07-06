import z from 'zod';

export const createAccountSchema = z
  .object({
    description: z
      .string()
      .min(1, 'Description is required')
      .max(256, 'Description is too long'),
    value: z.number().positive(),
    account_type: z.enum(['PAYABLE', 'RECEIVABLE']),
  })
  .required();

export type CreateAccountDto = z.infer<typeof createAccountSchema>;
