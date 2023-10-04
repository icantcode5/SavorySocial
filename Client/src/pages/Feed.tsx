import Header from "../components/Header"
import Post from "../components/Post"
// import { useEffect } from "react"
// import { selectCurrentUser } from "../features/auth/authSlice"
import { useAppSelector } from "../types/Redux.types"
import { RootState } from "../app/store"
import { RecipeFormSchema, RecipeFormType } from "../models/RecipePost"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	useAddRecipePostMutation,
	useGetAllRecipePostsQuery,
} from "../features/recipePosts/recipePostsApiSlice"

function Feed() {
	const user = useAppSelector((state: RootState) => state.auth.user)
	const { data } = useGetAllRecipePostsQuery()
	const [addRecipePost, { isLoading }] = useAddRecipePostMutation()

	console.log(data)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RecipeFormType>({
		resolver: zodResolver(RecipeFormSchema),
	})

	//CREATE FORM VALIDATON AND SCHEMAS TO MAKE SURE WE SANITIZE THE DATA COMING THROUGH THE FORM TO CREATE A POST
	const formSubmit = async (recipeFormData: object): Promise<void> => {
		console.log(recipeFormData)
		try {
			const response = await addRecipePost({
				...recipeFormData,
				user_id: user.user_id,
			}).unwrap()
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Header />
			<div className="text-center pb-3.5">
				Welcome to your Feed page, {`${user.name}`}!
			</div>
			<div className="flex flex-col justify-center border-2 container mx-auto px-12 pt-3 max-w-3xl min-h-screen">
				<form className="flex flex-col" onSubmit={handleSubmit(formSubmit)}>
					<label htmlFor="recipeName" className="pl-1 pb-1">
						Recipe Name
					</label>
					<input
						id="recipeName"
						type="text"
						className="rounded-md h-8 pl-1"
						autoComplete="off"
						{...register("recipeName")}
					/>
					{errors.recipeName && (
						<span>{errors.recipeName.message?.toString()}</span>
					)}
					<label htmlFor="ingredients" className="pl-1 pb-1">
						Ingredients
					</label>
					<textarea
						id="ingredients"
						className="rounded-md pl-1 resize-none overflow-hidden"
						rows={6}
						autoComplete="off"
						{...register("ingredients")}
					/>
					<label htmlFor="directions" className="pl-1 pb-1">
						Directions
					</label>
					<textarea
						id="directions"
						className="rounded-md pl-1 resize-none overflow-hidden"
						rows={8}
						autoCorrect="on"
						{...register("directions")}
					/>
					<label htmlFor="notes" className="pl-1">
						Notes
					</label>
					<textarea
						id="notes"
						className="rounded-md mb-4 pl-1 resize-none overflow-hidden"
						rows={6}
						{...register("notes")}
					/>
					<button className="rounded-md mb-8">Create New Post</button>
				</form>
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</>
	)
}

export default Feed
