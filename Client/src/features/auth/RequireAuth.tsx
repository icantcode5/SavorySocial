import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

function RequireAuth() {
	const { accessToken } = useSelector((state: RootState) => state.auth.user)

	return accessToken ? <Outlet /> : <Navigate to={"/login"} />
}

export { RequireAuth }
