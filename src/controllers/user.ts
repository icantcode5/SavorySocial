import { Request, Response } from "express"
import { Pool } from "pg"

export async function registerUser(request: Request, response: Response) {
	const { name, email, password } = request.body
	let client

	const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})

	try {
		client = await pool.connect()
		//result from DB is returned in an array of objects representing each row entry as an object
		const result = await client.query(
			"INSERT INTO users(name, email, password) VALUES ($1,$2,$3)",
			[name, email, password]
		)

		response.status(200).send("User Successfully created!")
	} catch (error) {
		console.log("controller error", error)
	} finally {
		client?.release()
	}
}

export async function loginUser(request: Request, response: Response) {
	const { email, password } = request.body
	const query = "SELECT * FROM users WHERE email = $1"
	const values = [email]

	const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})

	try {
		const client = await pool.connect()
		const result = await client.query(query, values)

		response
			.status(200)
			.send(
				`User Successfully signed in with following email: ${result.rows[0].email}`
			)
	} catch (error) {
		console.log(error)
	}
}
