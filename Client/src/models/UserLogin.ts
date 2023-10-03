import { z, ZodType } from "zod"

type FormType = z.infer<typeof UserLoginSchema>

const UserLoginSchema: ZodType = z.object({
	name: z.string().trim().min(2, { message: "Must be 2 characters or more" }),
	email: z.string().trim().email().toLowerCase(),
	password: z
		.string()
		.trim()
		.min(8, { message: "Must contain atleast 8 characters or more" }),
})

export { UserLoginSchema, type FormType }
