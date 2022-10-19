import "dotenv/config";
import { Application } from "express";
import { ValidationError } from "sequelize";
import { user, userId } from "../../types/user";
import { token } from "../../types/token";
import { ApiException } from "../../types/exception";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt")
const { User } = require("../../database/connect");

export interface ProcessEnv {
	[key: string]: string | undefined;
}

/**
 * @swagger
 * tags:
 *      name: Login
 *      description: manage le login
 */

/**
 * @openapi
 * /api/login:
 *  post:
 *      tags: [Login]
 *      description: Login d'un utilisateur (User)
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"mail": "test@test.com","password": "test"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé
 */
module.exports = (app: Application) => {
	app.post("/api/login", (req, res) => {
		User.findOne({ where: { mail: req.body.mail } })
			.then(async (user: userId) => {
				const checkPassword = await bcrypt.compare(
					req.body.password,
					user.password
				);
				if (checkPassword) {
					const payload = { id: user.id, email: user.mail };
					const refreshToken: any = jwt.sign(
						payload,
						process.env.JWT_TOKEN_SECRET as string
					);
					const accessToken: any = jwt.sign(
						payload,
						process.env.JWT_TOKEN as string,
						{ expiresIn: "30min" }
					);
					const message: string = `L'Utilisateur a été touvé.`;
					res.json({
						message,
						refreshToken: refreshToken,
						accessToken: accessToken,
					});
				} else {
					res.status(400).json({ message: "Mot de passe Invalide" });
				}
			})
			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `L'Utilisateur n'a pas pu être trouvé'. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};
