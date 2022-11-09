import "dotenv/config";
import { Application, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const { User, Token } = require("../../database/connect");

module.exports = (app: Application) => {
	app.post("/api/refreshToken", (req: Request, res: Response) => {
		// retrieve the oldRefreshToken from headers 
		const authHeader = req.headers["authorization"];
		const oldRefreshToken: string | undefined = authHeader && authHeader.split(" ")[1];
		try {
			// verify that the token is not null
			if (oldRefreshToken == null) {
				throw new Error("token string is null ")
			}

			// verify that the refesh token is valid
            if(!jwt.verify(oldRefreshToken, process.env.JWT_TOKEN_SECRET as string)) {
                throw new Error("refresh token non valable!");
            }

			// decode the token to retrieve the value
			const val = jwt.decode(oldRefreshToken, process.env.JWT_TOKEN_SECRET );
            const mail = val.mail;
			const userId = val.id;

			// verify that the user exist
            User.findOne({ where: { mail } })

			// create new tokens
			const payload = { id: userId, email: mail };
			const refreshToken: any = jwt.sign(
				payload,
				process.env.JWT_TOKEN_SECRET as string
			);
			const accessToken: any = jwt.sign(
				payload,
				process.env.JWT_TOKEN as string,
				{ expiresIn: "1m" }
			);

			// i update the refresh token in database
			Token.update({ token: refreshToken, UserId: userId });
			const message: string = `Les tokens ont été renouvelé avec succès.`;
			return res.status(200)
			.json({
				message,
				refreshToken: refreshToken,
				accessToken: accessToken,
			});
		} catch (error) {
			return res.status(400)
			.json({ message: error });
		}
	});
};
