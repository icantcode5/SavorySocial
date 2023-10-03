import { Request, Response } from "express"
import { Pool } from "pg"

//prettier-ignore
export async function getFeed(request:Request, response: Response) : Promise<void>{
  const {recipeName, ingredients, directions, notes} = request.body
  let client

  const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
  try {
    client = await pool.connect()


  } catch (error) {
    
  }finally{
    client?.release()
  }
}
