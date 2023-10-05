import { apiSlice } from "../auth/apiSlice"

interface RecipePostType {
	recipeName: string
	ingredients: string
	directions: string
	notes: string
}

type FinalType = RecipePostType[]

export const recipePostsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllRecipePosts: builder.query<FinalType, void>({
			query: () => "/api/feed",
			keepUnusedDataFor: 5,
			providesTags: ["recipeData"],
		}),
		addRecipePost: builder.mutation({
			query: (recipeData) => ({
				url: "/api/feed/addRecipePost",
				method: "POST",
				body: recipeData,
			}),
			invalidatesTags: ["recipeData"],
		}),
	}),
})

export const { useGetAllRecipePostsQuery, useAddRecipePostMutation } =
	recipePostsApiSlice
