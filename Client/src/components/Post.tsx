import PostsContainer from "./PostContainer"
import { DateTimeFormatOptions } from "../types/RecipePost.types"
import { useAppSelector } from "../types/Redux.types"

interface Props {
	recipeName: string
	ingredients: string
	directions: string
	notes: string
	createdAt: string
	postId: string
	handleDelete: (id: string) => void
}

//prettier-ignore
function Post({ recipeName, ingredients, directions, notes, createdAt, postId, handleDelete }: Props) {

	const { user } = useAppSelector((state) => state.auth)

	const date = new Date(createdAt)
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		// minute : "numeric",
		// hour : "numeric",
		hour12 : true,
	} as DateTimeFormatOptions

	const formatLocal : string = date.toLocaleDateString("en-us", options) //COME BACK TO THIS!!!

	return (
		<>
			<PostsContainer>
				<div className="pb-4 pl-3 pr-3 ">
					<h1 className="text-center italic">Recipe: {recipeName}</h1>
					<h2 className="text-lg pt-2 font-semibold italic">Ingredients:</h2>
					<section>{ingredients}</section>
					<h2 className="text-lg pt-2 font-semibold italic">Directions:</h2>
					<section>{directions}</section>
					<h2 className="text-lg pt-2 font-semibold italic">Notes:</h2>
					<section className="pb-4 text-base">{notes}</section>
					<span className="text-[12px]">Posted On: {formatLocal} by {user.name}</span>
					<div className="flex flex-row justify-between mt-2">
						<button className="" onClick={() => handleDelete(postId)}>Delete</button>
						<button className="">Edit Post</button>
					</div>
				</div>
			</PostsContainer>
		</>
	)
}

export default Post
