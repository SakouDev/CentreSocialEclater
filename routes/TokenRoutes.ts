import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../types/exception"
import { token } from "../types/token"
import { Token } from "../database/connect";

/**
 * @swagger
 * tags:
 *      name: Token
 *      description: Manage les routes Token
 */

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
module.exports = (app: Application) => {
  app.post("/api/tokens", (req, res) => {
    Token.create(req.body)
      .then((token: token) => {
        const message: string = `Le Token ${req.body.name} a bien été crée.`;
        res.json({ message, data: token });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le Token n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};

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
 module.exports = (app :Application) => {
    app.delete('/api/tokens/:id', (req, res) => {
      Token.findByPk(req.params.id).then((token: token) => {
        if (token === null){
          const message = "Le Token demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }
  
        const tokenDeleted = token;
        return  Token.destroy({
          where: { id: token.id }
        })
        .then(() => {
          const message = `Le Token avec l'identifiant n°${tokenDeleted.id} a bien été supprimé.`
          res.json({message, data: tokenDeleted })
        })
      })
      .catch((error: ApiException) => {
        const message = `Le token n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
    })
  }

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
module.exports = (app : Application) => {
    app.get('/api/tokens', (req,res) => {
        Token.findAll()
        .then((tokens: token) => {
            const message : string = 'La liste des Tokens à bien était récuperée.'
            res.json({message, data: tokens})
        })
        .catch((error : ApiException) => {
            const message = `La liste des Tokens n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    })
}

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
 module.exports = (app : Application) => {
    app.get('/api/tokens/:id', (req, res) => {
      Token.findByPk(req.params.id)
        .then((token : token )=> {
          if (token === null){
            const message = "Le Token demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
  
          const message : string = 'Un Token a bien été trouvé.'
          res.json({ message, data: token })
        })
        .catch((error : ApiException ) => {
          const message = "Le Token demander n'a pas pu être récuperer. Réessayer dans quelques instants."
          res.status(500).json({message, data: error})
        })
    })
  }

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
module.exports = (app: Application) => {
    app.put("/api/tokens/:id", (req, res) => {
      const id = req.params.id;
      Token.update(req.body, {
        where: { id: id },
      })
        .then(() => {
          return Token.findByPk(id).then((token: token) => {
            if (token === null){
              const message = "Le Token demandé n'existe pas. Réessayer avec un autre identifiant."
              return res.status(404).json({message})
            }
              const message = `Le Token ${token.token} a bien été modifié.`;
              res.json({ message, data: token });
            })
        })
        .catch((error: ApiException) => {
          if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
          }
          const message = `Le Token n'a pas pu être modifié. Réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    });
  };

  