import { generateRefreshToken } from "../utils/generateTokens"
import { Request, Response } from "express"
import { Jwt } from "jsonwebtoken"
import { Pool } from "pg"

//prettier-ignore
export async function getRefreshToken(request : Request, response: Response) : Promise<void>{
  const { refreshToken } = request.cookies
  let client
  const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
  })

  try {
    client = await pool.connect()
  } catch (error) {
    
  }
  finally{
    client?.release()
  }
}
