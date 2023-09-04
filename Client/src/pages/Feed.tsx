import Header from "../components/Header"
import axios from "axios"
import { useEffect } from "react"

function Feed() {
	useEffect(() => {
		async function getFeed() {
			const response = await axios.get("http://localhost:3000/api/feed")
			console.log(response.data)
		}
		getFeed()
	}, [])
	return (
		<>
			<Header />
			<div>Feed page!</div>
		</>
	)
}

export default Feed
