import { generateAccessToken } from "../utils/generateTokens"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Pool } from "pg"

//CHANGE TO GETNEWACCESSTOKEN SINCE WE ARE ONLY HITTING THIS ROUTE ONCE OUR ACCESS TOKEN HAS EXPIRED WHILE OUR REFRESH TOKEN IS STILL ACTIVE
//prettier-ignore
export async function getRefreshToken(request : Request, response: Response) : Promise<void>{
  const { refreshToken } = request.cookies
  const query = "SELECT FROM refresh_tokens WHERE id = $1"
  const value = [refreshToken]
  let client
  const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
  })

  try {
    client = await pool.connect()
    const refreshTokenFound = await client.query(query, value)
    console.log(refreshTokenFound)
    
    if(refreshTokenFound){
      try {
        //jwt.verify() method acts synchronously if in a try-catch block with no callback and acts async with a callback function passed to it
        const refreshTokenDecoded = jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET))
        const newAccessToken = generateAccessToken(refreshTokenDecoded)
        console.log(newAccessToken)

        response.cookie("acessToken", newAccessToken, {
          httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						sameSite: "strict",
						maxAge: 7 * 24 * 60 * 60 * 1000,
						path: "/",
        })

        response.send({newAccessToken})
      } catch (error) {
        console.log(error)
        response.status(403).send({error})
      }
    }

  } catch (error) {
    console.log(error)
  }
  finally{
    client?.release()
  }
}
