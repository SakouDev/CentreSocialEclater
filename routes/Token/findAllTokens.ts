import { Application } from "express"
import { Error } from "sequelize"
import { ApiException } from "../../types/exception"
import { token } from "../../types/token"

const {Token} = require('../../database/connect')

/**
 * @openapi
 * /api/tokens:
 *   get:
 *      tags: [Token]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
module.exports = (app : Application) => {
    app.get('/api/tokens', (req,res) => {
        Token.findAll()
        .then((tokens: token) => {
            const message : string = 'La liste des tokens à bien était récuperée.'
            res.json({message, data: tokens})
        })
        .catch((error : ApiException) => {
            const message = `La liste des tokens n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}