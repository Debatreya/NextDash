import { z } from "zod";


const contentValidation = z
	.string()
	.min(10, { message: "Message must contain at least 10 character" })
	.max(300, { message: "Message must contain at most 300 characters" });

export const messageSchema = z.object({
    content: contentValidation
});
