import { Application } from "express"
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const { Token } = require('../../database/connect')
  
/**
  * @openapi
  * /api/tokens/{id}:
  *  get:
  *      tags: [Token]
  *      description: Trouver un Token par son Id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
module.exports = (app : Application) => {
  app.get('/api/tokens/:id', (req, res) => {
    Token.findByPk(req.params.id)
      .then((token : token )=> {
        if (token === null){
          const message = "Le Token demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }

        const message : string = 'Un Token a bien été trouvé.'
        res.json({ message, data: token })
      })
      .catch((error : ApiException ) => {
        const message = "Le Token demander n'a pas pu être récuperer. Réessayer dans quelques instants."
        res.status(500).json({message, data: error})
      })
  })
}