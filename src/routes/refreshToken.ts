import { Router } from "express"
import { getRefreshToken } from "../controllers/refreshToken"

const router = Router()

router.get("/", getRefreshToken)

export default router
