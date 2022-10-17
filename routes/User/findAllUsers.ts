import { Application } from "express"
import { Error } from "sequelize"
import { ApiException } from "../../types/exception"
import { user } from "../../types/user"

const {User} = require('../../database/connect')

/**
 * @openapi
 * /api/users:
 *   get:
 *      tags: [User]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
module.exports = (app : Application) => {
    app.get('/api/users', (req,res) => {
        User.findAll()
        .then((users: user) => {
            const message : string = 'La liste des users à bien était récuperée.'
            res.json({message, data: users})
        })
        .catch((error : ApiException) => {
            const message = `La liste des users n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}