import { z } from 'zod';

import { PASSWORD_VALIDATION } from '../constants/constants.js';

export const registrationSchema = z
  .object({
    username: z.string().min(3, 'Minimum 3 znaki'),
    email: z.email('Nieprawidłowy email'),
    password: z
      .string()
      .regex(PASSWORD_VALIDATION, 'Hasło musi mieć min. 8 znaków, dużą i małą literę, cyfrę oraz znak specjalny'),
    confirmPassword: z.string().min(1, 'Potwierdź hasło'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne',
    path: ['confirmPassword'],
  });
