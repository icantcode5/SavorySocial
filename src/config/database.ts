import { Pool } from "pg"

const pool = new Pool({
	user: process.env.DB_USERNAME || "",
	host: process.env.DB_HOST || "",
	database: process.env.DB_DB || "",
	password: String(process.env.DB_PASSWORD) as string,
	port: parseInt(process.env.DB_PORT || "5432", 10), // your PostgreSQL port
	max: Number(process.env.DB_MAX_CONNECTIONS), // adjust this value based on your requirements
})

export { pool }
