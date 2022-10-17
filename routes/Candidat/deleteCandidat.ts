import { Application } from "express";
import { candidatId } from "../../types/candidat";
import { ApiException } from "../../types/exception";

const { Candidat } = require('../../database/connect')
  

/**
  * @openapi
  * /api/candidats/{id}:
  *  delete:
  *      tags: [Candidats]
  *      description: Delete a Candidat
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
  app.delete('/api/candidats/:id', (req, res) => {
    Candidat.findByPk(req.params.id).then((candidat: candidatId) => {
      if (candidat === null){
        const message = "Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const candidatDeleted = candidat;
      return  Candidat.destroy({
        where: { id: candidat.id }
      })
      .then(() => {
        const message = `Le Candidat avec l'identifiant n°${candidatDeleted.id} a bien été supprimé.`
        res.json({message, data: candidatDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `Le Candidat n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  })
}