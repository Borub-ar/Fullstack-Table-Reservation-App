import { z } from 'zod';

const PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

const USERNAME_MSG = 'Minimum 3 znaki';
const EMAIL_MSG = 'Nieprawidłowy email';
const PASSWORD_MSG = 'Hasło musi mieć min. 8 znaków, dużą i małą literę, cyfrę oraz znak specjalny';
const CONFIRM_PASSWORD_MSG = 'Potwierdź hasło';
const PASSWORD_MISMATCH_MSG = 'Hasła nie są identyczne';

export const registrationSchema = z
  .object({
    username: z.string().min(3, USERNAME_MSG),
    email: z.email(EMAIL_MSG),
    password: z.string().regex(PASSWORD_VALIDATION, PASSWORD_MSG),
    confirmPassword: z.string().min(1, CONFIRM_PASSWORD_MSG).optional(),
  })
  .refine(data => !data.confirmPassword || data.password === data.confirmPassword, {
    message: PASSWORD_MISMATCH_MSG,
    path: ['confirmPassword'],
  });
