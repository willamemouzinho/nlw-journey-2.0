import { z } from 'zod';

export const findByIdUserSchema = z.object({
  user_id: z.string().uuid(),
});

export type FindByIdUserDto = z.infer<typeof findByIdUserSchema>;
