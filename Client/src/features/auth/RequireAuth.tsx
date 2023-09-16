import { Outlet, Navigate } from "react-router-dom"

function RequireAuth() {
	const userLoggedIn = true

	return userLoggedIn ? <Outlet /> : <Navigate to={"/login"} />
}

export { RequireAuth }
