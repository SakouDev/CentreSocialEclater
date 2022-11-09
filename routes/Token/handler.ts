import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { token } from "../../types/token";

const { Token } = require("../../database/connect");

const getAllToken = (req: Request, res: Response) => {
	Token.findAll()
		.then((tokens: token) => {
			const message: string = "La liste des Tokens à bien était récuperée.";
			res.json({ message, data: tokens });
		})
		.catch((error: ApiException) => {
			const message = `La liste des Tokens n'a pas pu être récupérée. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const getTokenById = (req: Request, res: Response) => {
	Token.findByPk(req.params.id)
		.then((token: token) => {
			if (token === null) {
				const message =
					"Le Token demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const message: string = "Un Token a bien été trouvé.";
			res.json({ message, data: token });
		})
		.catch((error: ApiException) => {
			const message =
				"Le Token demander n'a pas pu être récuperer. Réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};

const createToken = (req: Request, res: Response) => {
	Token.create(req.body)
		.then((token: token) => {
			const message: string = `Le Token ${req.body.name} a bien été crée.`;
			res.json({ message, data: token });
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `Le Token n'a pas pu être ajouté. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const updateToken = (req: Request, res: Response) => {
	const id = req.params.id;
	Token.update(req.body, {
		where: { id: id },
	})
		.then(() => {
			return Token.findByPk(id).then((token: token) => {
				if (token === null) {
					const message =
						"Le Token demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}
				const message = `Le Token ${token.token} a bien été modifié.`;
				res.json({ message, data: token });
			});
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `Le Token n'a pas pu être modifié. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const deleteToken = (req: Request, res: Response) => {
	Token.findByPk(req.params.id)
		.then((token: token) => {
			if (token === null) {
				const message =
					"Le Token demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const tokenDeleted = token;
			return Token.destroy({
				where: { id: token.id },
			}).then(() => {
				const message = `Le Token avec l'identifiant n°${tokenDeleted.id} a bien été supprimé.`;
				res.json({ message, data: tokenDeleted });
			});
		})
		.catch((error: ApiException) => {
			const message = `Le token n'a pas pu être supprimé. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

export const handlerToken = {
	getAllToken,
	getTokenById,
	createToken,
	updateToken,
	deleteToken,
};
