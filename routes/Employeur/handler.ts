import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { employeur, employeurId } from "../../types/employeur";
import { ApiException } from "../../types/exception";
import { disponibilite } from "../../types/disponibilite";

const bcrypt = require("bcrypt");
const {
	Employeur,
	User,
	Disponibilite,
	UserDispo,
} = require("../../database/connect");

const getAllEmployeur = (req: Request, res: Response) => {
	Employeur.findAll({
		include: [
			{
				model: User,
				required: false,
			},
		],
	})
		.then((employeurs: employeur) => {
			const message: string = "La liste des Employeurs à bien était récuperée.";
			res.json({ message, data: employeurs });
		})
		.catch((error: ApiException) => {
			const message = `La liste des Employeurs n'a pas pu être récupérée. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const getEmployeurById = (req: Request, res: Response) => {
	Employeur.findByPk(req.params.id, {
		include: [
			{
				model: User,
				required: false,
				include: [
					{
						model: Disponibilite,
						required: false,
					},
				],
			},
		],
	})
		.then((employeur: employeur) => {
			if (employeur === null) {
				const message =
					"L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const message: string = "Un employeur a bien été trouvé.";
			res.json({ message, data: employeur });
		})
		.catch((error: ApiException) => {
			const message =
				"L'Employeur demander n'a pas pu être récuperer. Réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};

const createEmployeur = async (req: Request, res: Response) => {
	req.body.User.password = await bcrypt.hash(req.body.User.password, 10);
	User.create(req.body.User)
		.then((user: any) => {
			Employeur.create(req.body.Employeur).then((employeur: any) => {
				employeur.setUser(user);
			});
			req.body.Disponibilite.map(async (DispoMap: disponibilite) => {
				const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
				await user.addDisponibilite(DisponibiliteRow, { through: UserDispo });
			});
		})
		.then((employeurs: employeur) => {
			const message: string = "L'Employeur à bien été crée";
			res.json({ message, data: employeurs });
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `L'Employeur n'a pas pu être ajouté. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const updateEmployeur = (req: Request, res: Response) => {
	const id = req.params.id;
	Employeur.update(req.body, {
		where: { id: id },
	})
		.then(() => {
			return Employeur.findByPk(id).then((employeur: employeur) => {
				if (employeur === null) {
					const message =
						"L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}
				const message = `L'Employeur ${employeur.name} a bien été modifié.`;
				res.json({ message, data: employeur });
			});
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `L'Employeur n'a pas pu être modifié. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const deleteEmployeur = (req: Request, res: Response) => {
	Employeur.findByPk(req.params.id)
		.then((employeur: employeurId) => {
			if (employeur === null) {
				const message =
					"L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const employeurDeleted = employeur;
			return User.destroy({
				where: { id: employeur.UserId },
			}).then(() => {
				const message = `L'Employeur avec l'identifiant n°${employeurDeleted.id} a bien été supprimé.`;
				res.json({ message, data: employeurDeleted });
			});
		})
		.catch((error: ApiException) => {
			const message = `L'Employeur n'a pas pu être supprimé. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

export const handlerEmployeur = {
	getAllEmployeur,
	getEmployeurById,
	createEmployeur,
	updateEmployeur,
	deleteEmployeur,
};
