import jwt from "jsonwebtoken"

//Access Token
const accessTokenString = String(process.env.ACCESS_SECRET)

if (!accessTokenString) {
	throw new Error("ENV access token secret variable is undefined")
}
//Refresh Token
const refreshTokenString = String(process.env.REFRESH_TOKEN_SECRET)

if (!refreshTokenString) {
	throw new Error("ENV refresh token secret variable is undefined")
}

export function generateAccessToken(id: Number) {
	return jwt.sign({ id }, accessTokenString, {
		expiresIn: "1d",
	})
}
//Refresh Token
export function generateRefreshToken(id: Number) {
	return jwt.sign({ id }, refreshTokenString, {
		expiresIn: "7d",
	})
}
