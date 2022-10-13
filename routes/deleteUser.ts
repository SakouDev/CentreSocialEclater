import { Application } from "express";
import { ApiException } from "../types/exception";
import { Wow } from "../types/user";

const { Person } = require('../database/connect')
  

/**
  * @openapi
  * /api/users/{id}:
  *  delete:
  *      tags: [Users]
  *      description: Delete an user
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
  app.delete('/api/users/:id', (req, res) => {
    Person.findByPk(req.params.id).then((user: Wow) => {
      if (user === null){
        const message = "Le user demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const userDeleted = user;
     return  Person.destroy({
        where: { id: user.id }
      })
      .then(() => {
        const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
        res.json({message, data: userDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `L'utilisateur' n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  })
}