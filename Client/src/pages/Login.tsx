import Header from "../components/Header"

//Form Validation
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserLoginSchema, FormType } from "../models/UserLogin"

//	TODO : app is setup so now I have to work on setting up the pages and figure out flow of the recipe app. Can start with home page + login and register page

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		resolver: zodResolver(UserLoginSchema),
	})

	const formSubmit = (data: FormType) => {
		console.log(data)
	}

	return (
		<>
			<Header />
			<div className="flex justify-center items-center h-[calc(100vh-64px)]">
				<div className="flex flex-col items-center justify-center  p-8">
					<h1 className="mb-2">Sign In</h1>
					<form className="max-w-sm" onSubmit={handleSubmit(formSubmit)}>
						<input
							{...register("name")}
							type="text"
							name="name"
							placeholder="Name"
							// value={formValues.name}
							// onChange={inputChange}
							className="min-w-full mt-4 rounded-lg h-8 pl-2"
						/>
						{errors.name && <span>{errors.name.message}</span>}
						<input
							{...register("email")}
							type="email"
							name="email"
							placeholder="Email"
							// value={formValues.email}
							className="min-w-full mt-4 rounded-lg h-8 pl-2"
							// onChange={inputChange}
						/>
						{errors.email && <span>{errors.email.message}</span>}
						<input
							{...register("password")}
							type="password"
							placeholder="Password"
							name="password"
							// onChange={inputChange}
							// value={formValues.password}
							className="min-w-full mt-4
					rounded-lg h-8 pl-2"
						/>
						{errors.password && <span>{errors.password.message}</span>}

						<button className="mt-4 min-w-full">Submit</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
