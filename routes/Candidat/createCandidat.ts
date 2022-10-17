import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { ApiException } from "../../types/exception";

const { Candidat } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Candidats
 *      description: Manage les routes Candidat
 */

/**
  * @openapi
  * /api/candidats:
  *  post:
  *      tags: [Candidats]
  *      description: Crée un candidat
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"lastName": "Menfou","firstName": "MenfouAussi","birthday": "14/02/2001"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
  app.post("/api/candidats", (req, res) => {
    Candidat.create(req.body)
      .then((candidat: candidat) => {
        const message: string = `Le Candidat ${candidat.lastName} ${candidat.firstName} a bien été crée.`;
        res.json({ message, data: candidat });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le Candidat n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};
