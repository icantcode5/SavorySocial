import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	tagTypes: ["userAuth"],
	endpoints: (builder) => ({
		//Query method on builder is a basic "GET" method, for all other http requests with change data, we need to call the mutation method on builder.
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
	}),
})

export const { useUserLoginMutation, useUserRegisterMutation } = authApi
