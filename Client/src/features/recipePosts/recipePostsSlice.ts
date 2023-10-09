import { createSlice, PayloadAction } from "@reduxjs/toolkit/react"

type RecipePostType = {
	recipe_name: string
	ingredients: string
	directions: string
	notes: string
	post_id: string
	created_at: string
}

const initialState = {
	recipePosts: [
		{
			recipe_name: "",
			ingredients: "",
			directions: "",
			notes: "",
			post_id: "",
			created_at: Date(),
		},
	],
}

//In this case here, I am currently using RTK query hook to retrieve and render the recipe posts from the DB so I don't really need to use redux state to handle the state. If I was to do some manipulation of the data then I would use redux state to make changes once that data were recieved.
const recipePostsSlice = createSlice({
	name: "recipePosts",
	initialState: initialState,
	reducers: {
		//prettier-ignore
		setRecipePosts: (state, action : PayloadAction<RecipePostType[]>) => {
			state.recipePosts = action.payload
		},
	},
})

export const { setRecipePosts } = recipePostsSlice.actions

export default recipePostsSlice.reducer
