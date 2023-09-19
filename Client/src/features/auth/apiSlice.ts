import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		credentials: "include",
		// prepareHeaders: (headers, { getState }) => {
		// 	const token = getState().auth.token
		// 	console.log(token)
		// 	if (token) {
		// 		headers.set("authorization", `Bearer ${token}`)
		// 	}
		// 	return headers
		// },
	}),
	tagTypes: ["userAuth"],
	endpoints: (builder) => ({
		//Query method on builder is a basic "GET" method, for all other http requests with changing data, we need to call the mutation method on builder.
		userLogin: builder.mutation({
			query: (userData) => ({
				url: "/api/user/login",
				method: "POST",
				body: userData,
			}),
			invalidatesTags: ["userAuth"],
		}),
		userRegister: builder.mutation({
			query: (userData) => ({
				url: "/api/user/login",
				method: "POST",
				body: userData,
			}),
			invalidatesTags: ["userAuth"],
		}),
		userLogOut: builder.mutation({
			query: (body) => ({
				url: "/api/user/logOut",
				method: "DELETE",
				body: body,
			}),
			invalidatesTags: ["userAuth"],
		}),
	}),
})

export const {
	useUserLoginMutation,
	useUserRegisterMutation,
	useUserLogOutMutation,
} = authApi
