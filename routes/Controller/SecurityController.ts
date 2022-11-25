import "dotenv/config";
import { NextFunction, Request, Response, Application } from "express";
import { ValidationError } from "sequelize";
import { userId } from "../../types/user";
import { ApiException } from "../../types/exception";
const jwt = require("jsonwebtoken");
import bcrypt from 'bcrypt';
import { token } from "../../types/token";
const { User, Token } = require("../../database/connect");

export interface ProcessEnv {
	[key: string]: string | undefined;
}

/**
 * @swagger
 * tags:
 *      name: Security
 *      description: manage Security
 */

/**
 * @openapi
 * /api/login:
 *  post:
 *      tags: [Security]
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
 export const loginUser = async (req: Request, res: Response) => {
		User.scope('withPassword').findOne({ where: { mail: req.body.mail } })
			.then(async (user: userId) => {
				const checkPassword = await bcrypt.compare(
					req.body.password,
					user.password
				);
				if (checkPassword) {
					const payload = { id: user.id, email: user.mail, role: user.role };
					const refreshToken: any = jwt.sign(
						payload,
						process.env.JWT_TOKEN_SECRET as string
					);
					const accessToken: any = jwt.sign(
						payload,
						process.env.JWT_TOKEN as string,
						{ expiresIn: "12h" }
					);
					Token.create({token: refreshToken, UserId: user.id})
					const message: string = `L'Utilisateur a été touvé.`;
					res.json({
						message,
						refreshToken: refreshToken,
						accessToken: accessToken,
						role: user.role,
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
	}

/**
 * @openapi
 * /api/logout/{id}:
 *  delete:
 *      tags: [Security]
 *      description: Supprimer un token
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé.
 */
export const logoutUser = async (req: Request, res: Response) => {
		Token.findByPk(req.params.id)
			.then((token: token) => {
				if (token === null) {
					const message =
						"Le Token demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const tokenDeleted = token;
				return Token.destroy({
					where: { id: token.id },
				}).then(() => {
					const message = `Le Token avec l'identifiant n°${tokenDeleted.id} a bien été supprimé.`;
					res.json({ message, data: tokenDeleted });
				});
			})
			.catch((error: ApiException) => {
				const message = `Le token n'a pas pu être supprimé. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	}

export const protectedRoute = async (req: Request, res: Response) => {
		if (res.status(200)) {
			return res.json({
				success: true,
				Message: "Vous êtes authorisé a accéder à cette page.",
			});
		}
	}

export function checkAccessToken(req: Request,res: Response,next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const accessToken: string | undefined =
		authHeader && authHeader.split(" ")[1];
	try {
		if (accessToken == null) {
			return res.status(400).json({ message: "Le string token est null" });
		}
		jwt.verify(accessToken, process.env.JWT_Token as string);
		res.status(200);
		next()
	} catch (error) {
		if (error == "TokenExpiredError: jwt expired") {
			res.status(401).json({message: error });
			// if token expired send to refreshtoken route
		}else {
			res.status(401).json({message: error})
		}
	}
	next();
}

export const refreshTokens = async (req: Request, res: Response) => {
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
			const val = jwt.decode(oldRefreshToken, process.env.JWT_TOKEN_SECRET);
            const mail = val?.mail;
			const userId = val?.id;
			const role = val?.role

			// verify that the user exist
            User.findOne({ where: { mail } })

			// create new tokens
			const payload = { id: userId, email: mail, role: role };
			const refreshToken: any = jwt.sign(
				payload,
				process.env.JWT_TOKEN_SECRET as string
			);
			const accessToken: any = jwt.sign(
				payload,
				process.env.JWT_TOKEN as string,
				{ expiresIn: "30m" }
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
	}