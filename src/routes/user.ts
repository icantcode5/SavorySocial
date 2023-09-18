import { Router } from "express"
import { registerUser, loginUser, logOutUser } from "../controllers/user"

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logOut", logOutUser)

export default router
