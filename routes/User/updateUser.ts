import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { user } from "../../types/user";

const bcrypt = require("bcrypt");
const { User } = require("../../database/connect");

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags: [User]
 *      description: Modifier un utilisateur
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: formData
 *         default: {"mail": "test@test.com","visibility": true,"password": "test","address": "9 rue du régiment de la chaudière","zipCode": "62200", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.put("/api/users/:id", async (req, res) => {
		const id = req.params.id;
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		User.update({...req.body, password: hashedPassword}, {
			where: { id: id },
		})
		.then(() => {
			return User.findByPk(id).then((user: user) => {
				if (user === null) {
					const message =
						"L'Utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}
				const message = `L'Utilisateur ${user.mail} a bien été modifié.`;
				res.json({ message, data: user });
			});
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `L'Utilisateur' n'a pas pu être modifié. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
	});
};
