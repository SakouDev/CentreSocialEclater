import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { diplome } from "../../types/diplome";
import { disponibilite } from "../../types/disponibilite";
import { ApiException } from "../../types/exception";

const { Candidat, User, Disponibilite, UserDispo, Diplome, UserDiplome } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Candidats
 *      description: Manage les routes Candidat
 */

/**
  * @openapi
  * /api/candidats:
  *  post:
  *      tags: [Candidats]
  *      description: Crée un candidat
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"Candidat" : {"firstName": "Luc","lastName": "Vigneron","birthday": "27/04/1999"},"User": {"mail": "menfou@test.com","visibility": true,"password": "blabla","address": "9 rue du régiment de la chaudière","zipCode": 62200,"city": "Boulogne-sur Mer","role": "YEAH","image": "http://www.rien.com"},"Disponibilite": [{"id": 1},{"id": 4},{"id": 7}],"Diplome" : [{"id" : 2},{"id" : 4}]}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
  app.post("/api/candidats", (req, res) => {
    User.create(req.body.User).then((user : any) => {
      Candidat.create(req.body.Candidat).then ((candidat : any) => {
        candidat.setUser(user)
      })
      req.body.Disponibilite.map( async (DispoMap : disponibilite) => {
        const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
        await user.addDisponibilite(DisponibiliteRow, { through: UserDispo })
      })
      req.body.Diplome.map( async (DiploMap : diplome) => {
        const DiplomeRow = await Diplome.findByPk(DiploMap.id);
        await user.addDiplome(DiplomeRow, { through: UserDiplome })
      })
    })
    .then((candidats: candidat) => {
      const message : string = 'Le candidat à bien été crée'
      res.json({message, data: candidats})
    })
    .catch((error : ApiException) => {
      if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data : error})
      }
      const message = `Le Candidat n'a pas pu être ajouté. Réessayer dans quelques instants.`
      res.status(500).json({message, data : error})
    })
  });
};
