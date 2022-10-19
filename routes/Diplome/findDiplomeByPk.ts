import { Application } from "express"
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const { Diplome } = require('../../database/connect')
  
/**
  * @openapi
  * /api/diplomes/{id}:
  *  get:
  *      tags: [Diplomes]
  *      description: Trouver un diplome par son id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app : Application) => {
  app.get('/api/diplomes/:id', (req, res) => {
    Diplome.findByPk(req.params.id)
      .then((diplome : diplome )=> {
        if (diplome === null){
          const message = "Le Diplome demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }

        const message : string = 'Un Diplome a bien été trouvé.'
        res.json({ message, data: diplome })
      })
      .catch((error : ApiException ) => {
        const message = "Le Diplome demander n'a pas pu être récuperer. Réessayer dans quelques instants."
        res.status(500).json({message, data: error})
      })
  })
}