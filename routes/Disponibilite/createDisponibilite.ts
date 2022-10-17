import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { disponibilite } from "../../types/disponibilite";

const { Disponibilite } = require("../../database/connect");



/**
 * @openapi
 * /api/disponibilite:
 *  post:
 *      tags: [Disponibilite]
 *      description: Crée une disponibilite
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"namePeriod": "Mercredi"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.post("/api/disponibilite", (req, res) => {
		Disponibilite.create(req.body)
			.then((disponibilite: disponibilite) => {
				const message: string = `La disponibilité ${req.body.namePeriod} a bien été crée.`;
				res.json({ message, data: disponibilite });
			})
			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `La disponibilité n'a pas pu être ajouté. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};
