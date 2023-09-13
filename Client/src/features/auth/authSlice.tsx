import { createSlice } from "@reduxjs/toolkit/react"

// type reduxState = {
// 	user: Array<object>
// 	status: string
// 	error: string
// }

const initialState = {
	user: [{ name: "Carlos Sosa", email: "carlossosa54321@gmail.com" }],
	status: "",
	error: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
})

export default authSlice.reducer
