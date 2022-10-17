import { Application } from "express";
import { ApiException } from "../../types/exception";
//define the type of id
import { userId } from "../../types/user";

const { Disponibilite } = require("../../database/connect");

/**
 * @openapi
 * /api/disponibilite/{id}:
 *  delete:
 *      tags: [Disponibilite]
 *      description: Supprimer une disponibilité
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
	app.delete("/api/disponibilite/:id", (req, res) => {
		Disponibilite.findByPk(req.params.id)
			.then((disponibilite: userId) => {
				if (disponibilite === null) {
					const message =
						"La disponibilité demandée n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const dispoDeleted = disponibilite;
				return Disponibilite.destroy({
					where: { id: disponibilite.id },
				}).then(() => {
					const message = `La disponibilité avec l'identifiant n°${dispoDeleted.id} a bien été supprimé.`;
					res.json({ message, data: dispoDeleted });
				});
			})
			.catch((error: ApiException) => {
				const message = `La 'disponibilite' n'a pas pu être supprimé. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};
