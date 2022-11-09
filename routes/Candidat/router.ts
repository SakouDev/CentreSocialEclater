const { Router } = require('express')

import { handlerCandidat } from './handler'

export const candidatRouter = Router();


/**
 * @swagger
 * tags:
 *      name: Candidats
 *      description: Manage les routes Candidat
 */


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
candidatRouter.get('/', handlerCandidat.getAllCandidat)


/**
  * @openapi
  * /api/candidats/{id}:
  *  get:
  *      tags: [Candidats]
  *      description: Trouver un candidat par son Id
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
candidatRouter.get('/:id', handlerCandidat.getCandidatById)


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
candidatRouter.post("/", handlerCandidat.createCandidat)


/**
  * @openapi
  * /api/candidats/{id}:
  *  put:
  *      tags: [Candidats]
  *      description: Modifier un candidat
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
  *         default: {"lastName": "Menfou","firstName": "MenfouAussi","birthday": "14/02/2001"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
candidatRouter.put("/:id", handlerCandidat.updateCandidat)


/**
  * @openapi
  * /api/candidats/{id}:
  *  delete:
  *      tags: [Candidats]
  *      description: Supprimer un Candidat
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
candidatRouter.delete('/:id', handlerCandidat.deleteCandidat)