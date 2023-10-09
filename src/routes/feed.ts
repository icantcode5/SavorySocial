import { Router } from "express"
import protect from "../middleware/auth"
import { addRecipePost, deleteRecipePost, getFeed } from "../controllers/feed"

const router = Router()

//rename get feed later
router.get("/", getFeed)
router.post("/addRecipePost", addRecipePost)
router.delete("/deleteRecipePost:id", deleteRecipePost)

export default router
