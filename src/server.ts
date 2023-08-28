import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import dotenv from "dotenv"

const PORT = 3000
dotenv.config({ path: "./config/.env" })

const app = express()
app.use(cors())
app.use(bodyParser.json)

//Serve Frontend files when running in production
if (process.env.NODE_ENV === "production") {
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "./Frontend/dist/index.html"))
	})
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
