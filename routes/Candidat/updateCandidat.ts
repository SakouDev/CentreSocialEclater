import { Application } from "express";
import { ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { ApiException } from "../../types/exception";
import { user } from "../../types/user";

const { Candidat } = require("../../database/connect");

/**
  * @openapi
  * /api/candidats/{id}:
  *  put:
  *      tags: [Candidats]
  *      description: Modifier un candidat
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: formData
  *         default: {"lastName": "Menfou","firstName": "MenfouAussi","birthday": "14/02/2001"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
module.exports = (app: Application) => {
  app.put("/api/candidats/:id", (req, res) => {
    const id = req.params.id;
    Candidat.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Candidat.findByPk(id).then((candidat: candidat) => {
          if (candidat === null){
            const message = "Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
            const message = `Le Candidat "${candidat.lastName} ${candidat.firstName}" a bien été modifié.`;
            res.json({ message, data: candidat });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le Candidat n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};