import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { disponibilite } from "../../types/disponibilite";
import { userId } from "../../types/user";
import { Disponibilite } from "../../database/connect";

/**
 * @swagger
 * tags:
 *      name: Disponibilite
 *      description: Manage les routes Disponibilité
 */

/**
 * @openapi
 * /api/disponibilite:
 *  post:
 *      tags: [Disponibilite]
 *      description: Crée une disponibilité
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
				const message: string = `La Disponibilité ${req.body.namePeriod} a bien été crée.`;
				res.json({ message, data: disponibilite });
			})
			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `La Disponibilité n'a pas pu être ajouté. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};

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
						"La Disponibilité demandée n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const dispoDeleted = disponibilite;
				return Disponibilite.destroy({
					where: { id: disponibilite.id },
				}).then(() => {
					const message = `La Disponibilité avec l'identifiant n°${dispoDeleted.id} a bien été supprimé.`;
					res.json({ message, data: dispoDeleted });
				});
			})
			.catch((error: ApiException) => {
				const message = `La 'Disponibilite' n'a pas pu être supprimé. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	});
};

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
