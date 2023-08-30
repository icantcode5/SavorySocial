import { FormEvent, ChangeEvent, useState } from "react"
import Axios from "axios"
// type FormObject = {
// 	name : string
// }

//	TODO : app is setup so now I have to work on setting up the pages and figure out flow of the recipe app. Can start with home page + login and register page

function Register() {
	const [formValues, setFormValues] = useState<{
		name: string
		email: string
		password: string
	}>({
		name: "",
		email: "",
		password: "",
	})

	const submitForm = (e: FormEvent) => {
		e.preventDefault()
		console.log(formValues)
		Axios.get("http://localhost:3000/api/users/register")
			.then((response) => {
				console.log(response.data)
			})
			.catch((err) => console.log(err))
	}

	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		setFormValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}
	return (
		<>
			<div>Login Page</div>
			<form onSubmit={submitForm}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formValues.name}
					onChange={inputChange}
					className="min-w-full mt-4 rounded-lg h-8 pl-2"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formValues.email}
					className="min-w-full mt-4 rounded-lg h-8 pl-2"
					onChange={inputChange}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={inputChange}
					value={formValues.password}
					className="min-w-full mt-4
					rounded-lg h-8 pl-2"
				/>
				<button className="mt-4 min-w-full">Submit</button>
			</form>
		</>
	)
}

export default Register
