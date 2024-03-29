import express from "express"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

//Routes
import userRoutes from "./routes/user"
import feedRoutes from "./routes/feed"
import refreshTokenRoute from "./routes/refreshToken"

dotenv.config({ path: "./src/config/.env" })

const app = express()
app.use(cookieParser())
app.use(cors({ credentials: true, origin: "http://localhost:5173" })) //Have to look more into this. Works differently in other app.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Serve Client files when running in production
if (process.env.NODE_ENV === "production") {
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "./Client/dist/index.html"))
	})
}

app.use("/api/user", userRoutes)
app.use("/api/feed", feedRoutes)
app.use("/api/refreshToken", refreshTokenRoute)

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
