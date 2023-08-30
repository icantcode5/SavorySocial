import { Link } from "react-router-dom"

function Header() {
	return (
		<header className=" flex bg-red-400 flex-row justify-between">
			<h1 className="text-base">
				SavorySocial! A social platform to share and find receipes!
			</h1>
			<div className="">
				<ul className=" flex justify-between">
					<li className="mr-2.5">
						<Link to="/login">Login</Link>
					</li>
					<li className="mr-2.5">
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
