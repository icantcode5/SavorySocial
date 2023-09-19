import { Request, Response } from "express"

//prettier-ignore
export async function getFeed(request:Request, response: Response) : Promise<void>{
  console.log("hit feed backend")
  console.log(request.cookies.refreshToken) // doesn't work, but it does on logout
  response.status(200).send({message: "hit protected dashboard!"})
}
