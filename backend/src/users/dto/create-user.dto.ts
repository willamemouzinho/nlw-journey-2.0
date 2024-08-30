import { z } from 'zod';

export const createUserSchema = z.object({
  sub: z.string(),
  name: z.string().min(3),
  given_name: z.string().min(3),
  family_name: z.string().min(3),
  picture: z.string().url(),
  email: z.string().email(),
  email_verified: z.boolean(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
