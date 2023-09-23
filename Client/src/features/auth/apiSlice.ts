import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "./authSlice"

export const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3000",
	credentials: "include",
})

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
			//retry original query with new access token since it's on pause while we react to the message and create a new access token if our refresh token is still valid meaning our logged in session is still valid
			result = await baseQuery(args, api, extraOptions)
		}else{
			api.dispatch(logOut())
		}
	}else{
		return result
	}
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: (builder) => ({}),
})
