import Header from "../components/Header"
// import Axios from "axios"
//Form Validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserLoginSchema, FormType } from "../models/UserLogin"
import { useNavigate } from "react-router-dom"
import { useUserLoginMutation } from "../features/auth/authApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/auth/authSlice"

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [userLogin, { isLoading }] = useUserLoginMutation()
	console.log(isLoading)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		resolver: zodResolver(UserLoginSchema),
	})

	const formSubmit = async (userData: FormType) => {
		//A promise life cycle object is created which handles the asynchronous part of the request
		try {
			const response = await userLogin(userData).unwrap() //.unwrap() allows us access the payload or error of our mutation call
			dispatch(setCredentials(response[0]))
			console.log(response[0])
			navigate("/feed")
		} catch (error) {
			//SET UP ERROR MESSAGES INCASE LOGIN FUNCTION DIDN'T WORK AND DISPLAY TO USER
			console.log(error)
		}
	}

	return (
		<>
			<Header />
			<div className="flex justify-center items-center h-[calc(100vh-64px)]">
				<div className="flex flex-col items-center justify-center  p-8">
					<h1 className="mb-2">Sign In</h1>
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

						<button className="mt-4 min-w-full">Submit</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
