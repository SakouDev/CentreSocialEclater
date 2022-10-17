import { Application } from "express";
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const { Diplome } = require("../database/connect");
  

/**
  * @openapi
  * /api/diplomes/{id}:
  *  delete:
  *      tags: [Templates]
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
  app.delete('/api/diplomes/:id', (req, res) => {
    Diplome.findByPk(req.params.id).then((diplome: diplomeId) => {
      if (diplome === null){
        const message = "Le diplome demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const userDeleted = diplome;
      return  Diplome.destroy({
        where: { id: diplome.id }
      })
      .then(() => {
        const message = `Le diplome avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
        res.json({message, data: userDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `Le diplome n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  })
}