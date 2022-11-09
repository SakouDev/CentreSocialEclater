const { Router } = require('express')

import {handlerUser } from "./handler"

export const userRouter = Router();


/**
 * @swagger
 * tags:
 *      name: User
 *      description: Gérer les routes Utilisateur (User)
 */


/**
 * @openapi
 * /api/users:
 *   get:
 *      tags: [User]
 *      description: Liste des Utilisateurs
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.get("/", handlerUser.getAllUser)

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *      tags: [User]
 *      description: Trouver un utilisateur par son Id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.get("/:id", handlerUser.getUserById)

/**
 * @openapi
 * /api/users:
 *  post:
 *      tags: [User]
 *      description: Crée un utilisateur
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"mail": "Menfou@gmail.com","visibility": true,"password": "menfou","address": "9 rue du régiment de la chaudière","zipCode": "62200", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.post("/", handlerUser.createUser)


/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags: [User]
 *      description: Modifier un utilisateur
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
 *         default: {"mail": "test@test.com","visibility": true,"password": "test","address": "9 rue du régiment de la chaudière","zipCode": "62200", "city": "Boulogne-sur-Mer", "role": "", "image": "https://picsum.photos/200/300"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.put("/:id", handlerUser.updateUser)


/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags: [User]
 *      description: Supprimer un utilisateur
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.delete("/:id", handlerUser.deleteUser)