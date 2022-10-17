import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const { Token } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Token
 *      description: Manage template
 */

/**
  * @openapi
  * /api/tokens:
  *  post:
  *      tags: [Token]
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
  app.post("/api/tokens", (req, res) => {
    Token.create(req.body)
      .then((token: token) => {
        const message: string = `Le token ${req.body.name} a bien été crée.`;
        res.json({ message, data: token });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le token n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};
