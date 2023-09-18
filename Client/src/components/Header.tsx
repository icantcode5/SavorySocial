import { Link } from "react-router-dom"

function Header() {
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
					<li className="mr-2.5">
						<Link className="text-white" to="/login">
							Logout
						</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
