import { Application } from "express"
import { employeur } from "../../types/employeur"
import { ApiException } from "../../types/exception"

const { Employeur } = require('../../database/connect')
  
/**
  * @openapi
  * /api/employeurs/{id}:
  *  get:
  *      tags: [Employeurs]
  *      description: Trouver un employeur par son id
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
  app.get('/api/employeurs/:id', (req, res) => {
    Employeur.findByPk(req.params.id)
      .then((employeur : employeur )=> {
        if (employeur === null){
          const message = "L'employeur demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }

        const message : string = 'Un employeur a bien été trouvé.'
        res.json({ message, data: employeur })
      })
      .catch((error : ApiException ) => {
        const message = "L'employeur demander n'a pas pu être récuperer. Réessayer dans quelques instants."
        res.status(500).json({message, data: error})
      })
  })
}