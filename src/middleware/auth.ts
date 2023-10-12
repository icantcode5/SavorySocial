import jwt, { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import { pool } from "../config/database"

//This allows us to not extend our Request type globally and keep it local as well as allows us to add any other properties we want to extend
export type CustomRequest = Request & { userId?: string }

//prettier-ignore
async function protect(request:CustomRequest, response: Response, next: NextFunction
): Promise<void> {
	const {accessToken} =  request.cookies
	const {refreshToken} =  request.cookies

	if (accessToken && refreshToken) {
		try {
			const client = await pool.connect()
			//Verify jwt token in cookie headers
			//prettier-ignore
			const decodedAccessTokenPayload = jwt.verify(accessToken, String(process.env.JWT_SECRET)) as JwtPayload
			console.log(decodedAccessTokenPayload.id)
			const getUserByIdQuery = "SELECT user_id FROM users WHERE user_id = $1"
			const values = [decodedAccessTokenPayload.id]
			

			//prettier-ignore
			const user = await client.query(getUserByIdQuery,values)
			request.userId = user.rows[0].user_id
			next()
		} catch (err) {
			console.log(err)
			response.status(403).json({ error: err })
			throw new Error("Not Authorized!")  //THIS LINE OF CODE STOPS THE SERVER FROM RUNNING WHICH IS NOT WHAT WE WANT WHEN WE WANT TO GET A NEW REFRESH TOKEN AFTER AN EXPIRED ONE COMES THROUGH THE MIDDLEWARE
		}
	}

	if (!refreshToken) {
		response.status(400).send("No cookie found, not Authorized")
		throw new Error("No cookie found, Not Authorized")
	}
	console.log("protect function hit!")
}

export default protect
