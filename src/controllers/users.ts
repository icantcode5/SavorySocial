import { Request, Response } from "express"

export async function registerUser(request: Request, response: Response) {
	response.status(200).send({ msg: "This API route is working!!!!" })
}
