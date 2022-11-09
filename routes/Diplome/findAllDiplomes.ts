import { Application } from "express"
import { Error } from "sequelize"
import { ApiException } from "../../types/exception"
import { diplome } from "../../types/diplome"

const {Diplome} = require('../../database/connect')

/**
 * @openapi
 * /api/diplomes:
 *   get:
 *      tags: [Diplomes]
 *      description: Liste des diplomes
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé
 */
module.exports = (app : Application) => {
    app.get('/api/diplomes', (req,res) => {
        Diplome.findAll()
        .then((diplomes: diplome) => {
            const message : string = 'La liste des Diplomes à bien était récuperée.'
            res.json({message, data: diplomes})
        })
        .catch((error : ApiException) => {
            const message = `La liste des Diplomes n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}