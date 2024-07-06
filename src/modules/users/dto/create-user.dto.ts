import z from 'zod';

export const createUserSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(30, 'Password must be at most 30 characters long')
      .refine(
        (password) => /[A-Z]/.test(password),
        'Password must contain at least one uppercase letter'
      )
      .refine(
        (password) => /[a-z]/.test(password),
        'Password must contain at least one lowercase letter'
      )
      .refine(
        (password) => /[0-9]/.test(password),
        'Password must contain at least one number'
      )
      .refine(
        (password) => /[^a-zA-Z0-9]/.test(password),
        'Password must contain at least one special character'
      ),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
