import { z, ZodType } from "zod"

type FormData = {
	name: string
	email: string
	password: string
	confirmedPassword: string
}

const UserRegisterSchema: ZodType<FormData> = z
	.object({
		name: z.string().trim().min(2, { message: "Must be 2 characters or more" }),
		email: z.string().trim().email().toLowerCase(),
		password: z
			.string()
			.trim()
			.min(8, { message: "Must contain atleast 8 characters or more" }),
		confirmedPassword: z
			.string()
			.trim()
			.min(8, { message: "Must contain atleast 8 characters or more" }),
	})
	.refine((data) => data.password === data.confirmedPassword, {
		message: "Passwords do not match",
		path: ["confirmedPassword"],
	})

export { UserRegisterSchema, type FormData }
