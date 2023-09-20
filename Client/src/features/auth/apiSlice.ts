import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
const baseQueryWithReAuth = async (args, api, extraOptions) => {}

export const {
	useUserLoginMutation,
	useUserRegisterMutation,
	useUserLogOutMutation,
} = authApi
