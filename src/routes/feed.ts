import { Router } from "express"
import protect from "../middleware/auth"
import { getFeed } from "../controllers/feed"

const router = Router()

//rename get feed later
router.get("/", protect, getFeed)

export default router
