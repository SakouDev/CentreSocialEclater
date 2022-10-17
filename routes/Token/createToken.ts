import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const { Token } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Token
 *      description: Manage les routes Token
 */

/**
  * @openapi
  * /api/tokens:
  *  post:
  *      tags: [Token]
  *      description: Crée un token
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"token": "fegdfg5g5dfg5dfg5dfgf5gdfg6fd6gf6g.55gsdf65gf65gfgf5dgdf5g5g5dfg5dg5f.dg5dfg5dg5dg5dfg5ffffgfdg2dfg5sfdg5", "tokenPush": "menfou"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
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
