import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction, RequestHandler } from "express"

//prettier-ignore
async function protect(request: Request, response: Response, next: NextFunction
	//The function will execute some sort of promise and the <void> means that there won't be anything being returned since this is a middleware function we are just going to move on or throw an error based on the information we receive. This is also true for controller async functions that query the DB and send it to the front end since we aren't returning anything explicity nor implicityly.
): Promise<void> {
	console.log("protect function hit!")
}

export default protect
