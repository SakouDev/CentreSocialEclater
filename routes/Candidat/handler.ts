import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { diplome } from "../../types/diplome";
import { disponibilite } from "../../types/disponibilite";
import { ApiException } from "../../types/exception";

const bcrypt = require("bcrypt");
const {
	Candidat,
	User,
	Disponibilite,
	UserDispo,
	Diplome,
	UserDiplome,
} = require("../../database/connect");

const getAllCandidat = (req: Request, res: Response) => {
	Candidat.findAll({
		include: [
			{
				model: User,
				required: false,
			},
		],
	})
		.then((candidats: candidat) => {
			const message: string = "La liste des candidats à bien était récuperée.";
			res.json({ message, data: candidats });
		})
		.catch((error: ApiException) => {
			const message = `La liste des candidats n'a pas pu être récupérée. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const getCandidatById = (req: Request, res: Response) => {
	Candidat.findByPk(req.params.id, {
		include: [
			{
				model: User,
				required: false,
				include: [
					{
						model: Diplome,
						required: false,
					},
					{
						model: Disponibilite,
						required: false,
					},
				],
			},
		],
	})
		.then((candidat: candidat) => {
			if (candidat === null) {
				const message =
					"Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const message: string = "Un Candidat à bien été trouvé.";
			res.json({ message, data: candidat });
		})
		.catch((error: ApiException) => {
			const message =
				"Le Candidat demander n'a pas pu être récuperer. Réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};

const createCandidat = async (req: Request, res: Response) => {
	req.body.User.password = await bcrypt.hash(req.body.User.password, 10);
	User.create(req.body.User)
		.then((user: any) => {
			Candidat.create(req.body.Candidat).then((candidat: any) => {
				candidat.setUser(user);
			});
			req.body.Disponibilite?.map(async (DispoMap: disponibilite) => {
				const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
				await user.addDisponibilite(DisponibiliteRow, { through: UserDispo });
			});
			req.body.Diplome?.map(async (DiploMap: diplome) => {
				const DiplomeRow = await Diplome.findByPk(DiploMap.id);
				await user.addDiplome(DiplomeRow, { through: UserDiplome });
			});
		})
		.then((candidats: candidat) => {
			const message: string = "La création du Candidat s'est bien déroulé";
			res.json({ message, data: candidats });
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `Le Candidat n'a pas pu être ajouté. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const updateCandidat = (req: Request, res: Response) => {
	const id = req.params.id;
	Candidat.update(req.body, {
		where: { id: id },
	})
		.then(() => {
			return Candidat.findByPk(id).then((candidat: candidat) => {
				if (candidat === null) {
					const message =
						"Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant.";
					return res.status(404).json({ message });
				}
				const message = `Le Candidat "${candidat.lastName} ${candidat.firstName}" a bien été modifié.`;
				res.json({ message, data: candidat });
			});
		})
		.catch((error: ApiException) => {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message, data: error });
			}
			const message = `Le Candidat n'a pas pu être modifié. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

const deleteCandidat = (req: Request, res: Response) => {
	Candidat.findByPk(req.params.id)
		.then((candidat: any) => {
			if (candidat === null) {
				const message =
					"Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant.";
				return res.status(404).json({ message });
			}

			const candidatDeleted = candidat;
			return User.destroy({
				where: { id: candidat.UserId },
			}).then(() => {
				const message = `Le Candidat avec l'identifiant n°${candidatDeleted.id} a bien été supprimé.`;
				res.json({ message, data: candidatDeleted });
			});
		})
		.catch((error: ApiException) => {
			const message = `Le Candidat n'a pas pu être supprimé. Réessayer dans quelques instants.`;
			res.status(500).json({ message, data: error });
		});
};

export const handlerCandidat = {
	getAllCandidat,
	getCandidatById,
	createCandidat,
	updateCandidat,
	deleteCandidat,
};
