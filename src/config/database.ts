import { Pool } from "pg"

const pool = new Pool({
	user: "uwafgupv",
	host: "bubble.db.elephantsql.com",
	database: "uwafgupv",
	password: "exzVBvVhrIF2Y2d01N3DmFmGoIx6WVEO",
	port: 5432, // your PostgreSQL port
	max: 20, // adjust this value based on your requirements
})

export { pool }
