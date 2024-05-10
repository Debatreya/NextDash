import { z } from "zod";

export const signInSchema = z.object({
    // identifier = username or email
    identifier: z.string(),
    password: z.string()
});
