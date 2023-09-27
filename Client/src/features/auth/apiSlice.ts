import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "./authSlice"
import { BaseQueryFn } from "@reduxjs/toolkit/query"

const simpleBaseQuery: BaseQueryFn<
	string, // Args
	unknown, // Result
	{ reason: string }, // Error
	{ shout?: boolean }, // DefinitionExtraOptions
	{ timestamp: number } // Meta
> = (arg, api, extraOptions) => {
	// `arg` has the type `string`
	// `api` has the type `BaseQueryApi` (not configurable)
	// `extraOptions` has the type `{ shout?: boolean }

	const meta = { timestamp: Date.now() }

	if (arg === "forceFail") {
		return {
			error: {
				reason: "Intentionally requested to fail!",
				meta,
			},
		}
	}

	if (extraOptions.shout) {
		return { data: "CONGRATULATIONS", meta }
	}

	return { data: "congratulations", meta }
}

export const baseQuery: typeof simpleBaseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3000",
	credentials: "include",
})

//Custom Query function syntax
const baseQueryWithReAuth: typeof simpleBaseQuery = async (
	args,
	api,
	extraOptions
) => {
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
