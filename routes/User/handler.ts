import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { user, userId } from "../../types/user";

const bcrypt = require("bcrypt");
const { User } = require("../../database/connect");

const getAllUser = (req: Request, res: Response) => {
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
};

const getUserById = (req: Request, res: Response) => {
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
};

const createUser = (req: Request, res: Response) => {
	User.create({ ...req.body })
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
};

const updateUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	User.update(
		{ ...req.body, password: hashedPassword },
		{
			where: { id: id },
		}
	)
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
};


const deleteUser = (req: Request, res: Response) => {
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

export const handlerUser = {
	getAllUser,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
