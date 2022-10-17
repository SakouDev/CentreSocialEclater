import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const { Diplome } = require("../database/connect");

/**
  * @openapi
  * /api/diplomes/{id}:
  *  put:
  *      tags: [Diplomes]
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
  app.put("/api/diplomes/:id", (req, res) => {
    const id = req.params.id;
    Diplome.update(req.body, {
      where: { id: id },
    })
      .then(() => {
       return Diplome.findByPk(id).then((diplome: diplome) => {
          if (diplome === null){
            const message = "Le diplome demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
            const message = `Le diplome ${diplome.certificate} a bien été modifié.`;
            res.json({ message, data: diplome });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le diplome n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
