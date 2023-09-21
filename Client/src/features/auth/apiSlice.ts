import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { error } from "console"
import { setCredentials } from "./authSlice"

export const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3000",
	credentials: "include",
})
// tagTypes: ["userAuth"]
// endpoints: (builder) => ({
// 	//Query method on builder is a basic "GET" method, for all other http requests with changing data, we need to call the mutation method on builder.
// 	userLogin: builder.mutation({
// 		query: (userData) => ({
// 			url: "/api/user/login",
// 			method: "POST",
// 			body: userData,
// 		}),
// 		invalidatesTags: ["userAuth"],
// 	}),
// 	userRegister: builder.mutation({
// 		query: (userData) => ({
// 			url: "/api/user/login",
// 			method: "POST",
// 			body: userData,
// 		}),
// 		invalidatesTags: ["userAuth"],
// 	}),
// 	userLogOut: builder.mutation({
// 		query: (body) => ({
// 			url: "/api/user/logOut",
// 			method: "DELETE",
// 			body: body,
// 		}),
// 		invalidatesTags: ["userAuth"],
// 	}),
//  }),

//Custom Query function syntax
const baseQueryWithReAuth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	//prettier-ignore
	if(result?.error?.originalStatus === 403){
		console.log("sending refresh token")
		const refreshResult = await baseQuery("/api/refreshToken", api, extraOptions)
		console.log(refreshResult)
		if(refreshResult?.data){
			//store new token in state
			const user = api.getState().auth.user
			api.dispatch(setCredentials({...refreshResult.data, user}))
			//retry original query since it's on pause while we react to the message and create a new access token if our refresh token is still valid meaning our logged in session is still valid
		}
	}
}

export const {
	useUserLoginMutation,
	useUserRegisterMutation,
	useUserLogOutMutation,
} = authApi
