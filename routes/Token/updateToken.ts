import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const { Token } = require("../database/connect");

/**
  * @openapi
  * /api/tokens/{id}:
  *  put:
  *      tags: [Token]
  *      description: Update an template
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: formData
  *         default: {"name": "Template","mail": "Template@gmail.com","description": "Template","image": "https://picsum.photos/200/300"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
module.exports = (app: Application) => {
  app.put("/api/tokens/:id", (req, res) => {
    const id = req.params.id;
    Token.update(req.body, {
      where: { id: id },
    })
      .then(() => {
       return Token.findByPk(id).then((token: token) => {
          if (token === null){
            const message = "Le token demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
            const message = `Le token ${token.token} a bien été modifié.`;
            res.json({ message, data: token });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le token n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};