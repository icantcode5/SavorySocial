import jwt from "jsonwebtoken"

//Access Token
const accessTokenString = String(process.env.ACCESS_SECRET)

if (!accessTokenString) {
	throw new Error("ENV access token secret variable is undefined")
}
const refreshTokenString = String(process.env.REFRESH_TOKEN_SECRET)

if (!refreshTokenString) {
	throw new Error("ENV refresh token secret variable is undefined")
}

export function generateToken(id: Number) {
	return jwt.sign({ id }, accessTokenString, {
		expiresIn: "5m",
	})
}
//Refresh Token
export function generateRefreshToken(id: Number) {
	return jwt.sign({ id }, refreshTokenString, {
		expiresIn: "7d",
	})
}

//IMPLEMENT THE GENERATE token function for register user controller!
