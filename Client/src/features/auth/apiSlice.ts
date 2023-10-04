import {
	createApi,
	fetchBaseQuery,
	BaseQueryFn,
	BaseQueryApi,
} from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "./authSlice"
import { RootState } from "../../app/store"

export const baseQuery: BaseQueryFn = fetchBaseQuery({
	baseUrl: "http://localhost:3000",
	credentials: "include",
})

// Type for the custom base query function. This is the usual boiler plate code with undefined added
// type BaseQueryFnCustom<
// 	Args = unknown,
// 	Result = unknown,
// 	Error = unknown,
// 	DefintionExtraOptions = object
// 	// Meta = object
// > = (
// 	args: Args,
// 	api: BaseQueryApi,
// 	extraOptions: DefintionExtraOptions
// ) => MaybePromise<QueryReturnValue<Result, Error>>

// //Common pattern in typescript for handling synchronous and asynchronous values
// type MaybePromise<T> = T | Promise<T>

// type QueryReturnValue<
// 	Data = unknown,
// 	Error = unknown
// 	// Meta = undefined | object
// > = {
// 	data?: Data
// 	error?: Error
// 	isLoading: boolean
// 	isSuccess: boolean
// 	isError: boolean
// 	// meta?: Meta
// }

//Custom Query function syntax
//prettier-ignore
const baseQueryWithReAuth: BaseQueryFn = async (args, api , extraOptions) => {
	try {
		const result = await baseQuery(args, api, extraOptions)
		//prettier-ignore
		console.log(result?.error)
		if(result?.error === 403){
		console.log("sending refresh token")
		const refreshResult = await baseQuery("/api/refreshToken", api, extraOptions)
		console.log(refreshResult)
		if(refreshResult?.data){
			//store new token in state
			//We have to use type assertion to basically force/change a type on the spot since we know the type the variable should be at a certain point.
			const getState2  = api.getState() as RootState
			const user = getState2.auth.user 
			api.dispatch(setCredentials({...refreshResult.data, ...user}))
			//retry original query with new access token since it's on pause while we react to the message and create a new access token if our refresh token is still valid meaning our logged in session is still valid
			return {
				data: await baseQuery(args, api, extraOptions),
				isLoading: false,
				isError: false,
				isSuccess : true
			};
	} 
		else{
			api.dispatch(logOut())
			throw new Error("Log out due to refresh failure")
		} 
			}else{
		// return result ? {...result, meta:undefined} : undefined
		return {
			data : result?.data,
			isLoading: false,
			isSuccess: true,
			isError: false,
		};
		}
	} catch (e) {
		console.log(e)
		const errorMessage = e instanceof Error ? e.message : "An error occurred";
		return { isError: true, isLoading: false, isSuccess: false, error: errorMessage };
	}
}

// type CustomBaseQueryFn = BaseQueryFnCustom<unknown, unknown, unknown, object>

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth as BaseQueryFn,
	endpoints: (builder) => ({}),
	tagTypes: ["userAuth", "recipeData"], // add the tagtype to reference in endpoints specifically used as mutations to delete cache and reload them to update them
})

//providesTags: [] is for queries as invalidatesTags:[] is for mutations!
