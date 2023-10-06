import { createSlice, PayloadAction } from "@reduxjs/toolkit/react"

type RecipePostType = {
	recipeName: string
	ingredients: string
	directions: string
	notes: string
	post_id: string
	created_at: Date | undefined
}

const initialState = {
	recipePosts: {
		recipeName: "",
		ingredients: "",
		directions: "",
		notes: "",
		post_id: "",
		created_at: Date.now(),
	},
}

const recipePostsSlice = createSlice({
	name: "recipePosts",
	initialState: initialState,
	reducers: {
		//prettier-ignore
		setRecipePosts: (state, action : PayloadAction<RecipePostType>) => {
			state.recipePosts = action.payload
		},
	},
})

export const { setRecipePosts } = recipePostsSlice.actions

export default recipePostsSlice.reducer
