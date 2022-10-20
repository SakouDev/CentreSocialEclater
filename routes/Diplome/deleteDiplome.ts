import { Application } from "express";
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const { Diplome } = require("../../database/connect");
  

/**
  * @openapi
  * /api/diplomes/{id}:
  *  delete:
  *      tags: [Diplomes]
  *      description: Supprimer un diplome
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app :Application) => {
  app.delete('/api/diplomes/:id', (req, res) => {
    Diplome.findByPk(req.params.id).then((diplome: diplome) => {
      if (diplome === null){
        const message = "Le Diplome demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const diplomeDeleted = diplome;
      return  Diplome.destroy({
        where: { id: diplome.id }
      })
      .then(() => {
        const message = `Le Diplome avec l'identifiant n°${diplomeDeleted.id} a bien été supprimé.`
        res.json({message, data: diplomeDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `Le diplome n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  })
}