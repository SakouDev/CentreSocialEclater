const { Router } = require('express')

import { handlerEmployeur } from './handler'

export const employeurRouter = Router();


/**
 * @swagger
 * tags:
 *      name: Employeurs
 *      description: Manage les routes Employeur
 */


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
employeurRouter.get('/', handlerEmployeur.getAllEmployeur)


/**
  * @openapi
  * /api/employeurs/{id}:
  *  get:
  *      tags: [Employeurs]
  *      description: Trouver un employeur par son id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
employeurRouter.get('/:id', handlerEmployeur.getEmployeurById)


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
employeurRouter.post("/", handlerEmployeur.createEmployeur)


/**
  * @openapi
  * /api/employeurs/{id}:
  *  put:
  *      tags: [Employeurs]
  *      description: Modifier un Employeur
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
  *         default: {"name": "ECLATER", "siret": "231564156D125"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
employeurRouter.put("/:id", handlerEmployeur.updateEmployeur)


/**
  * @openapi
  * /api/employeurs/{id}:
  *  delete:
  *      tags: [Employeurs]
  *      description: Supprimer un Employeur
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
employeurRouter.delete('/:id', handlerEmployeur.deleteEmployeur)