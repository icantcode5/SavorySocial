import PostsContainer from "./PostContainer"

function Post() {
	return (
		<>
			<PostsContainer>
				<div className="pb-4 pl-3 ">
					<h1 className="text-center">Recipe : Apple Pie</h1>
					<h2 className="text-lg pt-2 font-semibold">Ingredients:</h2>
					<section>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
						impedit voluptate veniam laboriosam, dolores deleniti eaque
						accusantium aliquam nesciunt atque culpa, aut pariatur adipisci
						distinctio ipsum iste eum nostrum sit.
					</section>
					<h2 className="text-lg pt-2 font-semibold">Directions:</h2>
					<section>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
						blanditiis. Minus nobis mollitia vero amet consequuntur quidem
						officia, ea, maxime ipsam ullam nisi quos esse repudiandae tenetur
						delectus omnis earum?
					</section>
					<h2 className="text-lg pt-2 font-semibold">Notes:</h2>
					<section className="pb-4">Hello this is where the notes</section>
					<button className="rounded-full">Create Recipe Post</button>
				</div>
			</PostsContainer>
		</>
	)
}

export default Post
