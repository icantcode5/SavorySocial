import { Router } from "express"
import { registerUser, loginUser } from "../controllers/user"

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
// router.post("/logout", logoutUser)

export default router