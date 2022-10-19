import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { diplome } from "../../types/diplome";
import { disponibilite } from "../../types/disponibilite";
import { employeur } from "../../types/employeur";
import { ApiException } from "../../types/exception";

const bcrypt = require('bcrypt')
const { Employeur, User, Disponibilite, UserDispo } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Employeurs
 *      description: Manage les routes Employeur
 */

/**
  * @openapi
  * /api/employeurs:
  *  post:
  *      tags: [Employeurs]
  *      description: Crée un Employeur
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"name": "ECLATER", "siret": "231564156D125"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
 module.exports = (app: Application) => {
  app.post("/api/employeurs", async (req, res) => {
    req.body.User.password = await bcrypt.hash(req.body.User.password, 10)
    User.create(req.body.User).then((user : any) => {
      Employeur.create(req.body.Employeur).then ((employeur : any) => {
        employeur.setUser(user)
      })
      req.body.Disponibilite.map( async (DispoMap : disponibilite) => {
        const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
        await user.addDisponibilite(DisponibiliteRow, { through: UserDispo })
      })
    })
    .then((employeurs : employeur) => {
      const message : string = "L'Employeur à bien été crée"
      res.json({message, data: employeurs})
    })
    .catch((error : ApiException) => {
      if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data : error})
      }
      const message = `L'Employeur n'a pas pu être ajouté. Réessayer dans quelques instants.`
      res.status(500).json({message, data : error})
    })
  });
};