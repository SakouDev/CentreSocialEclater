import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { employeur } from "../../types/employeur";
import { ApiException } from "../../types/exception";

const { Employeur } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Employeurs
 *      description: Manage Candidat
 */

/**
  * @openapi
  * /api/employeurs:
  *  post:
  *      tags: [Employeurs]
  *      description: Crée un candidat dans la BDD
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
  app.post("/api/employeur", (req, res) => {
    Employeur.create(req.body)
      .then((employeur: employeur) => {
        const message: string = `L'Employeur ${req.body.name} a bien été crée.`;
        res.json({ message, data: employeur });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'Employeur n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};
