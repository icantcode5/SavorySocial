import { Pool } from "pg"
import {
	DB_DB,
	DB_HOST,
	DB_PASSWORD,
	DB_USERNAME,
	DB_PORT,
	DB_MAX_CONNECTIONS,
} from "../types/dotenv.types"

const pool = new Pool({
	user: DB_USERNAME,
	host: DB_HOST,
	database: DB_DB,
	password: DB_PASSWORD,
	port: Number(DB_PORT), // your PostgreSQL port
	max: Number(DB_MAX_CONNECTIONS), // adjust this value based on your requirements
})

export { pool }
