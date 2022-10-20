import "dotenv/config";
import { Application } from "express";
const passport = require('passport');
import "./passport"

const { User, Token  } = require("../../database/connect");

export interface ProcessEnv {
	[key: string]: string | undefined;
}

/**
 * @openapi
 * /api/protected:
 *  post:
 *      tags: [Security]
 *      description: Vérifier l'Accé a une page sécurisé
 *      parameters:
 *       - name: JSON
 *         in: header
 *         required: true
 *         type: http
 *          scheme: bearer
 *         default: {"authorization": "BEARER "}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé
 */
module.exports = (app: Application) => {
	app.post("/api/protected", passport.authenticate('jwt', {session: false}) , (req, res, next) => {
		res.status(200).json({success: true, Message: 'Vous êtes authorisé a accéder à cette page.'})
	});
};
