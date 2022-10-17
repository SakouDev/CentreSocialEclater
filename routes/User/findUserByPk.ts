import { Application } from "express";
import { ApiException } from "../../types/exception";
import { user } from "../../types/user";

const { User } = require("../../database/connect");

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *      tags: [User]
 *      description: Trouver un utilisateur par son Id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.get("/api/users/:id", (req, res) => {
		User.findByPk(req.params.id)
			.then((user: user) => {
				if (user === null) {
					const message =
						"Le utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const message: string = "Un utilisateur a bien été trouvé.";
				res.json({ message, data: user });
			})
			.catch((error: ApiException) => {
				const message =
					"L'utilisateur demandé n'a pas pu être récuperé. Réessayer dans quelques instants.";
				res.status(500).json({ message, data: error });
			});
	});
};
