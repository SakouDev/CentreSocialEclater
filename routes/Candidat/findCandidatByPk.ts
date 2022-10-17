import { Application } from "express"
import { candidat } from "../../types/candidat"
import { ApiException } from "../../types/exception"
import { user } from "../../types/user"

const { Candidat } = require('../../database/connect')
  
/**
  * @openapi
  * /api/candidats/{id}:
  *  get:
  *      tags: [Candidats]
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
  app.get('/api/candidats/:id', (req, res) => {
    Candidat.findByPk(req.params.id)
      .then((candidat : candidat )=> {
        if (candidat === null){
          const message = "Le user demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }

        const message : string = 'Un utilisateur a bien été trouvé.'
        res.json({ message, data: candidat })
      })
      .catch((error : ApiException ) => {
        const message = "Le user demander n'a pas pu être récuperer. Réessayer dans quelques instants."
        res.status(500).json({message, data: error})
      })
  })
}