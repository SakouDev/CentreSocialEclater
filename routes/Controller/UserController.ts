import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { user } from "../../types/user";
import { User } from "../../database/connect";
import { userId } from "../../types/user";
import bcrypt from "bcrypt";

/**
 * @swagger
 * tags:
 *      name: User
 *      description: Gérer les routes Utilisateur (User)
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
 *         default: {"mail": "Menfou@gmail.com","visibility": true,"password": "menfou","address": "9 rue du régiment de la chaudière","zipCode": "62200", "phone": "0122908812", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
 export const addUser = async (req: Request, res: Response) => {
		User.create({...req.body})
			.then((user: user) => {
				const message: string = `L'Utilisateur ${req.body.mail} a bien été crée.`;
				res.json({ message, data: user });
			})
			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `L'Utilisateur n'a pas pu être ajouté. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	}

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
 export const removeUser = async (req: Request, res: Response) => {
		User.findByPk(req.params.id)
			.then((user: userId) => {
				if (user === null) {
					const message =
						"L'Utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				const userDeleted = user;
				return User.destroy({
					where: { id: user.id },
				}).then(() => {
					const message = `L'Utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
					res.json({ message, data: userDeleted });
				});
			})
			.catch((error: ApiException) => {
				const message = `L'Utilisateur' n'a pas pu être supprimé. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});
	}

/**
 * @openapi
 * /api/users:
 *   get:
 *      tags: [User]
 *      description: Liste des Utilisateurs
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
 export const getAllUser = async (req: Request, res: Response) => {
		User.findAll()
		.then((users: user) => {
			const message: string =
				"La liste des Utilisateurs à bien était récuperée.";
			res.json({ message, data: users });
		})
		.catch((error: ApiException) => {
			const message = `La liste des Utilisateurs n'a pas pu être récupérée. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
	}

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
 export const getByIdUser = async (req: Request, res: Response) => {
		User.findByPk(req.params.id)
		.then((user: user) => {
			if (user === null) {
				const message =
					"Le Utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const message: string = "Un Utilisateur a bien été trouvé.";
			res.json({ message, data: user });
		})
		.catch((error: ApiException) => {
			const message =
				"L'Utilisateur demandé n'a pas pu être récuperé. Réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
	}

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
 *         default: {"mail": "Menfou@gmail.com","visibility": true,"password": "menfou","address": "9 rue du régiment de la chaudière","zipCode": "62200", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
 export const updateUser = async (req: Request, res: Response) => {
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
	}