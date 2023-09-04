import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Feed from "./pages/Feed"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home name="Carlos" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/feed" element={<Feed />} />
			</Routes>
		</>
	)
}

export default App
