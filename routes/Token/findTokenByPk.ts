import { Application } from "express"
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const { Token } = require('../../database/connect')
  
/**
  * @openapi
  * /api/tokens/{id}:
  *  get:
  *      tags: [Token]
  *      description: Get an template by id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
module.exports = (app : Application) => {
  app.get('/api/tokens/:id', (req, res) => {
    Token.findByPk(req.params.id)
      .then((token : token )=> {
        if (token === null){
          const message = "Le token demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }

        const message : string = 'Un token a bien été trouvé.'
        res.json({ message, data: token })
      })
      .catch((error : ApiException ) => {
        const message = "Le token demander n'a pas pu être récuperer. Réessayer dans quelques instants."
        res.status(500).json({message, data: error})
      })
  })
}