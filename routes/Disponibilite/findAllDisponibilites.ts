import { Application } from "express";
import { ApiException } from "../../types/exception";
import { disponibilite } from "../../types/disponibilite";

const { Disponibilite } = require("../../database/connect");

/**
 * @openapi
 * /api/disponibilite:
 *   get:
 *      tags: [Disponibilite]
 *      description: Liste des disponibilités
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
module.exports = (app: Application) => {
	app.get("/api/disponibilite", (req, res) => {
		Disponibilite.findAll()
			.then((disponibilite: disponibilite) => {
				const message: string =
					"La liste des Disponibilités à bien était récuperée.";
				res.json({ message, data: disponibilite });
			})
			.catch((error: ApiException) => {
				const message = `La liste des Disponibilités n'a pas pu être récupérée. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};