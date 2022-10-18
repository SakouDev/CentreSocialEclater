import { Application } from "express";
import { ValidationError } from "sequelize";
import { user } from "../../types/user";
import { ApiException } from "../../types/exception";
import bcrypt from "bcrypt";

const { User } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Login
 *      description: manage le login
 */

/**
 * @openapi
 * /api/login:
 *  post:
 *      tags: [Login]
 *      description: Login d'un utilisateur (User)
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"mail": "test@test.com","password": "test"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé
 */
module.exports = (app: Application) => {
	app.post("/api/login", (req, res) => {

		User.findOne({ where: {mail: req.body.mail}})

		.then( async (user: user) => {
				const checkPassword = await bcrypt.compare(req.body.password, user.password);
                if(checkPassword){
					const message: string = `L'utilisateur a été touvé.`;
					res.json({ message, data: user });
                }else {
					res.status(400).json({message:"mot de passe Invalide"})
				}
			})

			.catch((error: ApiException) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message = `L'Utilisateur n'a pas pu être trouvé'. Réessayer dans quelques instants.`;
				res.status(500).json({ message, data: error });
			});

	});
};