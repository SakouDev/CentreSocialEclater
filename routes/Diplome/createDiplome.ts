import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const { Diplome } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Diplomes
 *      description: Manage les routes Diplome
 */

/**
  * @openapi
  * /api/diplomes:
  *  post:
  *      tags: [Diplomes]
  *      description: Crée un diplome 
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"certificate": "Menfou"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
  app.post("/api/diplomes", (req, res) => {
    Diplome.create(req.body)
      .then((diplome: diplome) => {
        const message: string = `Le Diplome ${req.body.certificate} a bien été crée.`;
        res.json({ message, data: diplome });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le Diplome n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};
