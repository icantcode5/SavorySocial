import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function RequireAuth() {
	const { token } = useSelector((state) => state.auth)

	return token ? <Outlet /> : <Navigate to={"/login"} />
}

export { RequireAuth }
