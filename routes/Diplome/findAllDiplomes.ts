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
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
module.exports = (app : Application) => {
    app.get('/api/diplomes', (req,res) => {
        Diplome.findAll()
        .then((diplomes: diplome) => {
            const message : string = 'La liste des diplomes à bien était récuperée.'
            res.json({message, data: diplomes})
        })
        .catch((error : ApiException) => {
            const message = `La liste des diplomes n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}