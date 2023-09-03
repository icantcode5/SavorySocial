import Header from "../components/Header"
import Axios from "axios"
//Form Validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRegisterSchema, FormType } from "../models/UserRegister"

//	TODO : app is setup so now I have to work on setting up the pages and figure out flow of the recipe app. Can start with home page + login and register page

function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({ resolver: zodResolver(UserRegisterSchema) })

	const formSubmit = async (userData: FormType) => {
		try {
			const response = await Axios.post(
				"http://localhost:3000/api/user/register",
				userData
			)
			console.log(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Header />
			<div className="flex justify-center items-center h-[calc(100vh-64px)]">
				<div className="flex flex-col items-center justify-center p-8">
					<h1 className="mb-2">Register</h1>
					<form className="max-w-sm" onSubmit={handleSubmit(formSubmit)}>
						<input
							type="text"
							placeholder="Name"
							className="min-w-full mt-4 rounded-lg h-8 pl-2"
							{...register("name")}
						/>
						{errors.name && <span>{errors.name.message?.toString()}</span>}
						<input
							type="email"
							placeholder="Email"
							className="min-w-full mt-4 rounded-lg h-8 pl-2"
							{...register("email")}
						/>
						{errors.email && <span>{errors.email.message?.toString()}</span>}
						<input
							type="password"
							placeholder="Password"
							className="min-w-full mt-4
					    rounded-lg h-8 pl-2"
							{...register("password")}
						/>
						{errors.password && (
							<span>{errors.password.message?.toString()}</span>
						)}
						<input
							type="password"
							placeholder="Confirm Password"
							className="min-w-full mt-4
					    rounded-lg h-8 pl-2"
							{...register("confirmedPassword")}
						/>
						{errors.confirmedPassword && (
							<span>{errors.confirmedPassword.message?.toString()}</span>
						)}
						<button className="mt-4 min-w-full">Submit</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register
