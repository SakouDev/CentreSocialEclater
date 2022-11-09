import "dotenv/config";
import { Application, NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");


export interface ProcessEnv {
	[key: string]: string | undefined;
}

module.exports = (app: Application) => {
	app.post("/api/protected", checkAccessToken, (req, res) => {
		if (res.status(200)) {
			return res.json({
				success: true,
				Message: "Vous êtes authorisé a accéder à cette page.",
			});
		}
	});
};

function checkAccessToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers["authorization"];
	const accessToken: string | undefined =
		authHeader && authHeader.split(" ")[1];
	try {
		if (accessToken == null) {
			return res.status(400).json({ message: "Le string token est null" });
		}
		jwt.verify(accessToken, process.env.JWT_Token as string);
		res.status(200);
	} catch (error) {
		if (error == "TokenExpiredError: jwt expired") {
			res.status(401).json({message: "Le token est expiré" });
		}else {
			res.status(401).json({message: error})
		}
	}
	next();
}
