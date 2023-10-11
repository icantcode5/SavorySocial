import dotenv from "dotenv"
import path from "path"

const envPath = path.resolve(__dirname, "../config/.env") //This approach is more robust b/c working directories can change depending on the start point of the running script or context!
dotenv.config({ path: envPath })

const validateEnvVariable = (variable: string | undefined, name: string) => {
	if (!variable || variable.trim() === "") {
		console.error(`Environment variable ${name} is missing or empty.`)
		console.error(`process.env.${name} value:`, process.env[name])
		throw new Error(`Environment variable ${name} is missing or empty.`)
	}
	return variable
}

export const DB_USERNAME = validateEnvVariable(
	process.env.DB_USERNAME,
	"DB_USERNAME"
)
export const DB_HOST = validateEnvVariable(process.env.DB_HOST, "DB_HOST")
export const DB_DB = validateEnvVariable(process.env.DB_DB, "DB_DB")
export const DB_PASSWORD = validateEnvVariable(
	process.env.DB_PASSWORD,
	"DB_PASSWORD"
)
export const DB_PORT = validateEnvVariable(process.env.PORT, "DB_PORT")
export const DB_MAX_CONNECTIONS = validateEnvVariable(
	process.env.DB_MAX_CONNECTIONS,
	"MAX_CONNECTIONS"
)
