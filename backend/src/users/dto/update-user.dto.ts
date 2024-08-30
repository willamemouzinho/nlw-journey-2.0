import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  birth_at: z.string().date(),
  dismissed_at: z.string().date(),
  admitted_at: z.string().date(),
  is_admin: z.boolean().nullish(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
