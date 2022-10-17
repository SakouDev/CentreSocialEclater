import { Application } from "express";
import { ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { employeur } from "../../types/employeur";
import { ApiException } from "../../types/exception";
import { user } from "../../types/user";

const { Employeur } = require("../../database/connect");

/**
  * @openapi
  * /api/employeurs/{id}:
  *  put:
  *      tags: [Employeurs]
  *      description: Update an template
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
  *         default: {"name": "Template","mail": "Template@gmail.com","description": "Template","image": "https://picsum.photos/200/300"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
module.exports = (app: Application) => {
  app.put("/api/employeurs/:id", (req, res) => {
    const id = req.params.id;
    Employeur.update(req.body, {
      where: { id: id },
    })
      .then(() => {
       return Employeur.findByPk(id).then((employeur: employeur) => {
          if (employeur === null){
            const message = "L'employeur demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
            const message = `L'employeur ${employeur.name} a bien été modifié.`;
            res.json({ message, data: employeur });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'employeur n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};