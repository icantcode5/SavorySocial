import Header from "../components/Header"
import Post from "../components/Post"
// import { useEffect } from "react"
// import { selectCurrentUser } from "../features/auth/authSlice"
import { useAppSelector } from "../types/Redux.types"
import { RootState } from "../app/store"

function Feed() {
	const user = useAppSelector((state: RootState) => state.auth.user)

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
			<div className="flex flex-col justify-center border-2 container mx-auto px-12 pt-3 max-w-3xl min-h-screen">
				<form className="flex flex-col">
					<label htmlFor="recipeName" className="pl-1 pb-1">
						Recipe
					</label>
					<input
						id="recipeName"
						type="text"
						className="rounded-md min-h-{10}"
					/>
					<label htmlFor="ingredients" className="pl-1 pb-1">
						Ingredients
					</label>
					<input id="ingredients" type="text" className="rounded-md" />
					<label htmlFor="directions" className="pl-1 pb-1">
						Directions
					</label>
					<textarea
						id="directions"
						className="rounded-md "
						rows={8}
						autoCorrect="on"
					/>
					<label htmlFor="notes" className="pl-1 ">
						Notes
					</label>
					<textarea id="notes" className="rounded-md mb-4" rows={6} />
					<button className="rounded-md mb-8">Create New Post</button>
				</form>
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</>
	)
}

export default Feed
