import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useUserLogOutMutation } from "../features/auth/authApiSlice"
import { logOut } from "../features/auth/authSlice"

function Header() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [userLogOut, { isLoading }] = useUserLogOutMutation()

	const logOutUser = async () => {
		try {
			const response = await userLogOut({}).unwrap()
			if (response) {
				dispatch(logOut())
				navigate("/login")
			}
		} catch (error) {
			console.log(error)
			//SETUP ERROR MESSAGES HERE TOO
		}
	}

	return (
		<header className=" flex flex-row justify-between items-center h-16">
			<h1 className="text-lg ml-2.5 font-medium  ">
				<Link className="text-white" to="/">
					SavorySocial! A social platform to share and find receipes!
				</Link>
			</h1>
			<div className="">
				<ul className=" flex justify-between">
					<li className="mr-2.5">
						<Link className="text-white" to="/login">
							Login
						</Link>
					</li>
					<li className="mr-2.5">
						<Link className="text-white" to="/register">
							Register
						</Link>
					</li>
					<li
						className="mr-2.5 text-white font-medium  cursor-pointer"
						onClick={logOutUser}
					>
						Logout
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
