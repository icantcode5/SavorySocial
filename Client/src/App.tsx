import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Feed from "./pages/Feed"
import { RequireAuth } from "./features/auth/requireAuth"

// NOW THAT LOGIN RTK MUTATION WORKS, SET UP FEED ROUTE TO BE PROTECTED

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home name="Carlos" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<RequireAuth />}>
					<Route path="/feed" element={<Feed />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
