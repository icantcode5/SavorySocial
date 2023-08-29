import express from "express"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"

//Routes
import userRoutes from "./routes/users"

const PORT = 3000
dotenv.config({ path: "./config/.env" })

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Serve Client files when running in production
if (process.env.NODE_ENV === "production") {
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "./Client/dist/index.html"))
	})
}

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
