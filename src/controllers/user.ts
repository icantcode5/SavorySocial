import { Request, Response } from "express"
import { Pool } from "pg"
import bcrypt from "bcrypt"
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/generateTokens"

//prettier-ignore
export async function registerUser(request: Request, response: Response):Promise<void> {
	const { name, email, password } = request.body
	let client

	const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})

	try {
		client = await pool.connect()

		if(!name || !email  || !password){
			response.status(400)
			throw new Error("Make Sure all fields are filled out.")
		}

		//Check if user exists through email
		const userQuery = "SELECT * FROM users WHERE email = $1"
		const values = [email]
		const userExists = await client.query(userQuery, values)

		//Since postgresql will return a truthy statement for the response we get from querying the db, we have to check the specific information we get back which in our case is the table and the information inside that table ergo array of objects.
		if(userExists.rows[0]){
			response.status(400).send("A user with that email already Exists")
			throw new Error("User already exists")
		}


		//No user exists and we have the information we need so we move onto encrypting the password.
		//hash password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		//Password has been hashed so we can now save the user data to the DB

		//result from DB is returned in an array of objects representing each row entry as an object
		const user = await client.query(
			"INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING user_id",
			[name, email, hashedPassword]
		)

		//Once the user has been created successfully, we use can now send create the refresh token and access token and send them to the http cookie header for authentication.
		if(user.rows[0].user_id){
			response.cookie("accessToken" , generateAccessToken(user.rows[0].user_id) , {
				httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					sameSite: "strict",
					maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days - stars off in milliseconds
					path: "/",
			} )
		}
		//201 defines request was successful and a resource was created
		response.status(201).send("User Successfully created!" )

	} catch (error) {
		console.log(error)
	} finally {
		client?.release()
	}
}

//prettier-ignore
export async function loginUser(request: Request, response: Response): Promise<void> {
	const { email, password } = request.body
	let client
	console.log(email)
	console.log(password)

	const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})

	try {
		 client = await pool.connect()

		 if(!email  || !password){
			response.status(400)
			throw new Error("Make Sure all fields are filled out.")
		}

		//Find user
		const userQuery = "SELECT * FROM users WHERE email = $1"
		const values = [email]
		const result = await client.query(userQuery, values)
		const userPassword = result.rows[0].password
		const userID = result.rows[0].user_id

		if(userID && await bcrypt.compare(password, userPassword)){
			// const userId = result.rows[0] //user found
			const accessToken = generateAccessToken(userID)
			const refreshToken = generateRefreshToken(userID)

			//Token query and values
			const tokenQuery = "INSERT INTO refresh_tokens(refresh_token, user_id) VALUES ($1, $2)"
			const tokenValue = [refreshToken, userID]
			const addRefreshTokenToDB = await client.query(tokenQuery, tokenValue) //MAYBE SHOULD BE WRAPPED IN IF STATEMENT

			response
					.cookie("accessToken", accessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 7 * 24 * 60 * 60 * 1000,
						path: "/",
					})
					.cookie("refreshToken", refreshToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 7 * 24 * 60 * 60 * 1000,
						path: "/",
					})
			//send method here automatically sends the data as JSON format and axios in the frontend automatically parses it to use as soon as it is received.
			const arrayWithoutPassword = result.rows.map((obj) => ({user_id: obj.user_id, name: obj.name, email:obj.email, accessToken : accessToken }))
			response.status(200).send(arrayWithoutPassword)
			console.log("successfully signed in!")
		}else{
			response
					.status(400)
					.send("Please make sure email and password are correct") //client error, request will not be completed
				throw new Error("User Not Found")
		}
	} catch (error) {
		response.status(400)
		console.log(error)
	}finally{
		client?.release()
	}

}

//prettier-ignore
export async function logOutUser(request:Request, response:Response):Promise<void> {
	console.log("hit logout in backend")
	let client

		const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
	try {
		client = await pool.connect()
		const refreshToken = request.cookies.refreshToken
		//prettier-ignore
		const query = "DELETE FROM refresh_tokens WHERE refresh_token = $1"
		const value = [refreshToken]
		const deleteRefreshTokenFromDB = await client.query(query,value)
		
		if(deleteRefreshTokenFromDB){
			console.log("successfully deleted refresh token")
			response
			.clearCookie("refreshToken", {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000,
				path: "/",
			})
			.clearCookie("accessToken", {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000,
				path: "/",
			})
		response.status(200).send({message : "user logged out"})
		}
		
	} catch (error) {
		console.log(error)
	}finally{
		client?.release()
	}
}
