import { Request, Response } from "express"
import { pool } from "../config/database"
import { CustomRequest } from "../middleware/auth"

//prettier-ignore
export async function getFeed(request:Request, response: Response) : Promise<void>{
  const client = await pool.connect()
  
  try {
    const getAllRecipePostsQuery = "SELECT * FROM recipe_posts ORDER BY created_at DESC"

    const allRecipePosts = await client.query(getAllRecipePostsQuery)
    response.send(allRecipePosts.rows)

  } catch (error) {
    console.log(error)
  }finally{
    client.release()
  }
}

//prettier-ignore
export async function addRecipePost(request : CustomRequest, response: Response): Promise<void> {
  const {recipeName, ingredients, directions, notes} = request.body
  //Added user_id to middleware function to authenticate current user before allowing to hit API
  const user_id = request.userId
  const client = await pool.connect()

  try {
    const addRecipePostQuery = "INSERT INTO recipe_posts(recipe_name, ingredients, directions, notes, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *"
    const values = [recipeName, ingredients, directions, notes, user_id]

    const addRecipePost = await client.query(addRecipePostQuery, values)
    response.send(addRecipePost.rows)

  } catch (error) {
    console.log(error)
  }finally{
    client.release()
  }
}

//prettier-ignore
export async function deleteRecipePost(request:Request, response:Response): Promise<void>{
  const { id } = request.params
  const client = await pool.connect()

  try {
    const deleteRecipePostQuery = "DELETE FROM recipe_posts WHERE post_id=$1"
    const value = [id]

    const deleteRecipePost = await client.query(deleteRecipePostQuery, value)
    if(deleteRecipePost){
      response.send({message : "Successfully deleted recipe post!"})
    }
  } catch (error) {
    console.log(error)
  }finally{
    client.release()
  }
}
