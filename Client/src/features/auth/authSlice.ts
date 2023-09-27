import { createSlice, PayloadAction } from "@reduxjs/toolkit/react"

type User = {
	user_id: string
	email: string
	accessToken: string
	name: string
}

const initialState = {
	user: {
		user_id: "",
		name: "",
		email: "",
		accessToken: "",
	},
}

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		//prettier-ignore
		setCredentials: (state, action :PayloadAction<User>) => {
			state.user = action.payload
		},
		logOut: (state) => {
			state.user = {
				user_id: "",
				name: "",
				email: "",
				accessToken: "",
			}
		},
	},
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

// export const selectCurrentUser = (state) => {
// 	return state.auth.user
// }
// export const selectCurrentToken = (state) => {
// 	return state.auth.token
// }
