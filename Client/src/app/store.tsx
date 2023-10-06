import { configureStore } from "@reduxjs/toolkit"
// import authSlice from "../features/auth/authSlice"
import { apiSlice } from "../features/auth/apiSlice"
import authReducer from "../features/auth/authSlice"
import recipePostsReducer from "../features/recipePosts/recipePostsSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		recipePosts: recipePostsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	//When making request there is the default redux middleware that is an array and we have to attach the middleware created by out "authApi" slice so we concat it to the default middleware. The authApi middleware manages cache lifetimes and expirations and need to use it for RTK and any slices we use.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
