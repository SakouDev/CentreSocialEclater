import { Application } from "express";
import { employeurId } from "../../types/employeur";
import { ApiException } from "../../types/exception";

const { Employeur, User } = require('../../database/connect')
  

/**
  * @openapi
  * /api/employeurs/{id}:
  *  delete:
  *      tags: [Employeurs]
  *      description: Supprimer un Employeur
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
module.exports = (app :Application) => {
  app.delete('/api/employeurs/:id', (req, res) => {
    Employeur.findByPk(req.params.id).then((employeur: employeurId) => {
      if (employeur === null){
        const message = "L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const employeurDeleted = employeur;
      return  User.destroy({
        where: { id : employeur.UserId }
      })
      .then(() => {
        const message = `L'Employeur avec l'identifiant n°${employeurDeleted.id} a bien été supprimé.`
        res.json({message, data: employeurDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `L'Employeur n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  })
}