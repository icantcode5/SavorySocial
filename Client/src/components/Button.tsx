import { useNavigate } from "react-router-dom"

function Button() {
	const navigate = useNavigate()

	const goToLoginPage = () => {
		navigate("/login")
	}
	return (
		<button onClick={goToLoginPage} className=" text-red-700 mt-4">
			This is a Button, Click on it to take you to the login Page!
		</button>
	)
}

export default Button
