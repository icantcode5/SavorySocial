import { apiSlice } from "../auth/apiSlice"

//WORKING HERE CURRENTLY
export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		userLogin: builder.mutation({
			query: (userData) => ({
				url: "/api/user/login",
				method: "POST",
				body: userData,
			}),
			// invalidatesTags: ["userAuth"],
		}),
		userRegister: builder.mutation({
			query: (userData) => ({
				url: "/api/user/login",
				method: "POST",
				body: userData,
			}),
			// invalidatesTags: ["userAuth"],
		}),
		userLogOut: builder.mutation({
			query: (body) => ({
				url: "/api/user/logOut",
				method: "DELETE",
				body: body,
			}),
			// invalidatesTags: ["userAuth"],
		}),
	}),
})

export const {
	useUserLoginMutation,
	useUserRegisterMutation,
	useUserLogOutMutation,
} = authApiSlice
