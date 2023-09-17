import Header from "../components/Header"
import axios from "axios"
import { useEffect } from "react"
// import { selectCurrentUser } from "../features/auth/authSlice"
import { useSelector } from "react-redux"

function Feed() {
	const { token } = useSelector((state) => state.auth)
	const { name } = useSelector((state) => state.auth.user)
	useEffect(() => {
		async function getFeed() {
			const response = await axios.get("http://localhost:3000/api/feed")
			console.log(response.data)
		}
		getFeed()
		// const {userData} = selectCurrentUser()
	}, [])
	return (
		<>
			<Header />
			<div>Welcome to your Feed page, {`${name}`}!</div>
		</>
	)
}

export default Feed
