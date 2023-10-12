import { Router } from "express"
import protect from "../middleware/auth"
import { addRecipePost, deleteRecipePost, getFeed } from "../controllers/feed"

const router = Router()

//rename get feed later
router.get("/", protect, getFeed)
router.post("/addRecipePost", protect, addRecipePost)
router.delete("/deleteRecipePost:id", protect, deleteRecipePost)

export default router
