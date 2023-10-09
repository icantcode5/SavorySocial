import { apiSlice } from "../auth/apiSlice"

interface RecipePostType {
	recipe_name: string
	ingredients: string
	directions: string
	notes: string
	post_id: string
	created_at: string
}

export const recipePostsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllRecipePosts: builder.query<RecipePostType[], void>({
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
		deleteRecipePost: builder.mutation({
			query: (id) => ({
				url: `/api/feed/deleteRecipePost${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["recipeData"],
		}),
	}),
})

export const {
	useGetAllRecipePostsQuery,
	useAddRecipePostMutation,
	useDeleteRecipePostMutation,
} = recipePostsApiSlice
