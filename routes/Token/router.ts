const { Router } = require('express')

import {handlerToken} from './handler'

export const tokenRouter = Router();


/**
 * @swagger
 * tags:
 *      name: Token
 *      description: Manage les routes Token
 */

/**
 * @openapi
 * /api/tokens:
 *   get:
 *      tags: [Token]
 *      description: Liste des tokens
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulé.
 */ 
tokenRouter.get('/', handlerToken.getAllToken)


/**
  * @openapi
  * /api/tokens/{id}:
  *  get:
  *      tags: [Token]
  *      description: Trouver un Token par son Id
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
tokenRouter.get('/:id', handlerToken.getTokenById) 


/**
  * @openapi
  * /api/tokens:
  *  post:
  *      tags: [Token]
  *      description: Crée un token
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"token": "fegdfg5g5dfg5dfg5dfgf5gdfg6fd6gf6g.55gsdf65gf65gfgf5dgdf5g5g5dfg5dg5f.dg5dfg5dg5dg5dfg5ffffgfdg2dfg5sfdg5", "tokenPush": "menfou"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
tokenRouter.post("/", handlerToken.createToken)


/**
  * @openapi
  * /api/tokens/{id}:
  *  put:
  *      tags: [Token]
  *      description: Modifier un token
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
  *         default: {"token": "fegdfg5g5dfg5dfg5dfgf5gdfg6fd6gf6g.55gsdf65gf65gfgf5dgdf5g5g5dfg5dg5f.dg5dfg5dg5dg5dfg5ffffgfdg2dfg5sfdg5", "tokenPush": "menfou"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
tokenRouter.put("/:id", handlerToken.updateToken)


/**
  * @openapi
  * /api/tokens/{id}:
  *  delete:
  *      tags: [Token]
  *      description: Supprimer un token
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
tokenRouter.delete('/:id', handlerToken.deleteToken)