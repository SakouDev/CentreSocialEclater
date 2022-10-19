import { Application } from "express"
import { employeur } from "../../types/employeur"
import { ApiException } from "../../types/exception"

const { Employeur, User, Diplome, Disponibilite } = require('../../database/connect')

/**
 * @openapi
 * /api/employeurs:
 *   get:
 *      tags: [Employeurs]
 *      description: Liste des Employeurs
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé.
 */
module.exports = (app : Application) => {
    app.get('/api/employeurs', (req,res) => {
        Employeur.findAll({include: [
			{
				model : User,
				required : false,
			}
		]})
        .then((employeurs : employeur) => {
            const message : string = 'La liste des Employeurs à bien était récuperée.'
            res.json({message, data: employeurs})
        })
        .catch((error : ApiException) => {
            const message = `La liste des Employeurs n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}