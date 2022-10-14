import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../types/exception";
import { wowTemplate } from "../types/template";

const { User } = require("../database/connect");

/**
 * @swagger
 * tags:
 *      name: User
 *      description: Manage template
 */

/**
  * @openapi
  * /api/users:
  *  post:
  *      tags: [User]
  *      description: Crée un utilisateur dans la BDD
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"name": "Flo","mail": "Menfou@gmail.com","description": "SWAGGER TEST","image": "https://picsum.photos/200/300"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
  app.post("/api/users", (req, res) => {
    User.create(req.body)
      .then((user: wowTemplate) => {
        const message: string = `Le user ${req.body.name} a bien été crée.`;
        res.json({ message, data: user });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'utilisateur n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};
