import { Application } from "express";
import { ApiException } from "../../types/exception";
import { userId } from "../../types/user";

const { User } = require("../../database/connect");

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags: [User]
 *      description: Supprimer un utilisateur
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.delete("/api/users/:id", (req, res) => {
		User.findByPk(req.params.id)
			.then((user: userId) => {
				if (user === null) {
					const message =
						"L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const userDeleted = user;
				return User.destroy({
					where: { id: user.id },
				}).then(() => {
					const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
					res.json({ message, data: userDeleted });
				});
			})
			.catch((error: ApiException) => {
				const message = `L'utilisateur' n'a pas pu être supprimé. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};