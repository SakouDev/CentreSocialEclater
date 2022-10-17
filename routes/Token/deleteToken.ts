import { Application } from "express";
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const { Token } = require("../database/connect");
  

/**
  * @openapi
  * /api/tokens/{id}:
  *  delete:
  *      tags: [Token]
  *      description: Delete an template
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: Returns a mysterious string. 
  */
module.exports = (app :Application) => {
  app.delete('/api/tokens/:id', (req, res) => {
    Token.findByPk(req.params.id).then((token: token) => {
      if (token === null){
        const message = "Le token demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const tokenDeleted = token;
      return  Token.destroy({
        where: { id: token.id }
      })
      .then(() => {
        const message = `Le token avec l'identifiant n°${tokenDeleted.id} a bien été supprimé.`
        res.json({message, data: tokenDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `Le token n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  })
}