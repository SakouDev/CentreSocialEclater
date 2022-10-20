import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { disponibilite } from "../../types/disponibilite";

const { Disponibilite } = require("../../database/connect");

/**
 * @openapi
 * /api/disponibilite/{id}:
 *  put:
 *      tags: [Disponibilite]
 *      description: Modifier une disponibilité
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
 *         default: {"namePeriod": "Dimanche"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.put("/api/disponibilite/:id", (req, res) => {
		const id = req.params.id;
		Disponibilite.update(req.body, {
			where: { id: id },
		})
			.then(() => {
				return Disponibilite.findByPk(id).then((disponibilite: disponibilite) => {
					if (disponibilite === null) {
						const message =
							"La Disponibilité demandé n'existe pas. Réessayer avec un autre identifiant.";
						return res.status(404).json({ message });
					}
					const message = `La Disponibilité ${disponibilite.namePeriod} a bien été modifié.`;
					res.json({ message, data: disponibilite });
				});
			})
			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `La 'Disponibilite' n'a pas pu être modifié. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};
