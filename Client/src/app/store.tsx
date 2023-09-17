import { configureStore } from "@reduxjs/toolkit"
// import authSlice from "../features/auth/authSlice"
import { authApi } from "../features/auth/apiSlice"
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	//When making request there is the default redux middleware that is an array and we have to attach the middleware created by out "authApi" slice so we concat it to the default middleware. The authApi middleware manages cache lifetimes and expirations and need to use it for RTK and any slices we use.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
})
