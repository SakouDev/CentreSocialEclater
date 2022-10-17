import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { user } from "../../types/user";

const { User } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: User
 *      description: Gérer les routes utilisateurs
 */
 
/**
 * @openapi
 * /api/users:
 *  post:
 *      tags: [User]
 *      description: Crée un utilisateur
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"mail": "Menfou@gmail.com","visibility": true,"password": "menfou","address": "9 rue du régiment de la chaudière","zipCode": "62200", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.post("/api/users", (req, res) => {
		User.create(req.body)
			.then((user: user) => {
				const message: string = `Le user ${req.body.mail} a bien été crée.`;
				res.json({ message, data: user });
			})
			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `L'utilisateur n'a pas pu être ajouté. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};
