import { Application } from "express"
import { employeur } from "../../types/employeur"
import { ApiException } from "../../types/exception"

const { Employeur } = require('../../database/connect')

/**
 * @openapi
 * /api/employeurs:
 *   get:
 *      tags: [Employeurs]
 *      description: Return all employeurs
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
module.exports = (app : Application) => {
    app.get('/api/employeurs', (req,res) => {
        Employeur.findAll()
        .then((employeurs : employeur) => {
            const message : string = 'La liste des employeurs à bien était récuperée.'
            res.json({message, data: employeurs})
        })
        .catch((error : ApiException) => {
            const message = `La liste des employeurs n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}