import Button from "../../components/Button"
import Header from "../../components/Header"

type HomeProps = {
	name: string
}
function Home(props: HomeProps) {
	return (
		<>
			<Header />
			<main>
				This is where all the main content goes!
				<div>Picture of Food 1</div>
				<div>Picture of Food 2</div>
				<div>Picture of Food 3</div>
			</main>
			<Button />
		</>
	)
}

export default Home
