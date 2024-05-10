import {z} from 'zod';
import {usernameregex, passwordregex} from '../helpers/regex'

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(usernameregex, "Username must only contain letters, numbers, and underscores");

export const passwordValidation = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(passwordregex, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email("Please enter a valid email"),
    password: passwordValidation
});