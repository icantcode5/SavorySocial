import Button from "../components/Button"

type HomeProps = {
	name: string
}

function Home(props: HomeProps) {
	return (
		<>
			<div>Welcome to the home page {`${props.name}`}</div>
			<Button />
		</>
	)
}

export default Home
