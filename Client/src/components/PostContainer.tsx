//Since it's not too complex of a container, I might be able to just inluce it in the Post Component!

function PostContainer({ children }) {
	return (
		<div className="border-2 h-max min-w-fit rounded-lg shadow min-w-80 mb-4 ">
			{children}
		</div>
	)
}

export default PostContainer
