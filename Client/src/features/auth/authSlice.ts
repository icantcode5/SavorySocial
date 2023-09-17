import { createSlice } from "@reduxjs/toolkit/react"

const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null },
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken } = action.payload
			state.user = action.payload
			state.token = accessToken
		},
		logOut: (state) => {
			state.user = null
			state.token = null
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
