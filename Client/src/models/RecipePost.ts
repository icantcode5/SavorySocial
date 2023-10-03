import { z, ZodType } from "zod"

type RecipeFormType = z.infer<typeof RecipeFormSchema>

const RecipeFormSchema: ZodType = z.object({
	recipeName: z
		.string()
		.trim()
		.min(1, { message: "must provide a recipe name" }),
	ingredients: z.string().trim(),
	directions: z.string().trim(),
	notes: z.string().trim(),
})

export { RecipeFormSchema, type RecipeFormType }
