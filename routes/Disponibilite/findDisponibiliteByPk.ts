import { Application } from "express";
import { ApiException } from "../../types/exception";
import { disponibilite } from "../../types/disponibilite";

const { Disponibilite } = require("../../database/connect");

/**
 * @openapi
 * /api/disponibilite/{id}:
 *  get:
 *      tags: [Disponibilite]
 *      description: Trouver une disponibilité par son Id
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
	app.get("/api/disponibilite/:id", (req, res) => {
		Disponibilite.findByPk(req.params.id)
			.then((disponibilite: disponibilite) => {
				if (disponibilite === null) {
					const message =
						"La Disponibilité demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const message: string = "Une Disponibilité a bien été trouvé.";
				res.json({ message, data: disponibilite });
			})
			.catch((error: ApiException) => {
				const message =
					"La Disponibilité demandé n'a pas pu être récuperé. Réessayer dans quelques instants.";
				res.status(500).json({ message, data: error });
			});
	});
};
