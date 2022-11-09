import { Application } from "express"
import { candidat } from "../../types/candidat"
import { ApiException } from "../../types/exception"

const { Candidat, User, Diplome, Disponibilite } = require('../../database/connect')

/**
 * @openapi
 * /api/candidats:
 *   get:
 *      tags: [Candidats]
 *      description: récupérer tous les candidats
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé.
 */
module.exports = (app : Application) => {
    app.get('/api/candidats', (req,res) => {
        Candidat.findAll({include: [
			{
				model : User,
				required : false,
			}
		]})
        .then((candidats: candidat) => {
            const message : string = 'La liste des candidats à bien était récuperée.'
            res.json({message, data: candidats})
        })
        .catch((error : ApiException) => {
            const message = `La liste des candidats n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}