import Header from "../components/Header"
//Form Validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRegisterSchema, FormType } from "../models/UserRegister"
import { useUserRegisterMutation } from "../features/auth/authApiSlice"
import { setCredentials } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//	TODO : app is setup so now I have to work on setting up the pages and figure out flow of the recipe app. Can start with home page + login and register page

function Register() {
	const [userRegister, { isLoading }] = useUserRegisterMutation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({ resolver: zodResolver(UserRegisterSchema) })

	const formSubmit = async (userData: FormType): Promise<void> => {
		try {
			const response = await userRegister(userData).unwrap()
			dispatch(setCredentials(response[0]))
			console.log(response)
			navigate("/feed")
		} catch (error) {
			console.log(error)
			//ADJUST ERRORS TO HANDLE API QUERY/MUTATION
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
