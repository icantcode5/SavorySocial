import Header from "../components/Header"
import Post from "../components/Post"
import { useEffect } from "react"
// import { selectCurrentUser } from "../features/auth/authSlice"
import { useSelector } from "react-redux"

function Feed() {
	const { token } = useSelector((state) => state.auth)
	const { name } = useSelector((state) => state.auth.user)
	useEffect(() => {
		async function getFeed() {}
		getFeed()
		// const {userData} = selectCurrentUser()
	}, [])
	return (
		<>
			<Header />
			<div className="text-center pb-3.5">
				Welcome to your Feed page, {`${name}`}!
			</div>
			<div className="flex-column justify-center border-2 container mx-auto px-12 pt-3 max-w-3xl min-h-screen">
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</>
	)
}

export default Feed
