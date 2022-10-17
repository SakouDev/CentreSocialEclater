import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const { Diplome } = require("../database/connect");

/**
 * @swagger
 * tags:
 *      name: Diplome
 *      description: Manage template
 */

/**
  * @openapi
  * /api/diplomes:
  *  post:
  *      tags: [Diplome]
  *      description: Crée un utilisateur dans la BDD
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"mail": "Menfou@gmail.com","visibility": true,"password": "menfou","address": "9 rue du régiment de la chaudière","zipCode": "62200", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
  app.post("/api/diplomes", (req, res) => {
    Diplome.create(req.body)
      .then((diplome: diplome) => {
        const message: string = `Le diplome ${req.body.name} a bien été crée.`;
        res.json({ message, data: diplome });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le diplome n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};