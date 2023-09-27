import Header from "../components/Header"
import Post from "../components/Post"
// import { useEffect } from "react"
// import { selectCurrentUser } from "../features/auth/authSlice"
import { useAppSelector } from "../types/Redux.types"
import { RootState } from "../app/store"

function Feed() {
	const user = useAppSelector((state: RootState) => state.auth.user)
	// if (name === null) {
	// 	return <div>Loading...</div>
	// }
	// useEffect(() => {
	// 	async function getFeed() {}
	// 	getFeed()
	// }, [])

	return (
		<>
			<Header />
			<div className="text-center pb-3.5">
				Welcome to your Feed page, {`${user.name}`}!
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
