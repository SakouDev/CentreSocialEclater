import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../types/exception"
import { diplome } from "../types/diplome"
import { Diplome } from "../database/connect";

/**
 * @swagger
 * tags:
 *      name: Diplomes
 *      description: Manage les routes Diplome
 */

/**
  * @openapi
  * /api/diplomes:
  *  post:
  *      tags: [Diplomes]
  *      description: Crée un diplome 
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"certificate": "Menfou"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
  app.post("/api/diplomes", (req, res) => {
    Diplome.create(req.body)
      .then((diplome: diplome) => {
        const message: string = `Le Diplome ${req.body.certificate} a bien été crée.`;
        res.json({ message, data: diplome });
      })
      .catch((error : ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le Diplome n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
    })
  });
};

/**
  * @openapi
  * /api/diplomes/{id}:
  *  delete:
  *      tags: [Diplomes]
  *      description: Supprimer un diplome
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
 module.exports = (app :Application) => {
    app.delete('/api/diplomes/:id', (req, res) => {
      Diplome.findByPk(req.params.id).then((diplome: diplome) => {
        if (diplome === null){
          const message = "Le Diplome demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }
  
        const diplomeDeleted = diplome;
        return  Diplome.destroy({
          where: { id: diplome.id }
        })
        .then(() => {
          const message = `Le Diplome avec l'identifiant n°${diplomeDeleted.id} a bien été supprimé.`
          res.json({message, data: diplomeDeleted })
        })
      })
      .catch((error: ApiException) => {
        const message = `Le diplome n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
    })
  }

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

/**
  * @openapi
  * /api/diplomes/{id}:
  *  get:
  *      tags: [Diplomes]
  *      description: Trouver un diplome par son id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
 module.exports = (app : Application) => {
    app.get('/api/diplomes/:id', (req, res) => {
      Diplome.findByPk(req.params.id)
        .then((diplome : diplome )=> {
          if (diplome === null){
            const message = "Le Diplome demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
  
          const message : string = 'Un Diplome a bien été trouvé.'
          res.json({ message, data: diplome })
        })
        .catch((error : ApiException ) => {
          const message = "Le Diplome demander n'a pas pu être récuperer. Réessayer dans quelques instants."
          res.status(500).json({message, data: error})
        })
    })
  }

  /**
  * @openapi
  * /api/diplomes/{id}:
  *  put:
  *      tags: [Diplomes]
  *      description: Modifier un diplome
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
  *         default: {"certificate": "BAFA"}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
module.exports = (app: Application) => {
    app.put("/api/diplomes/:id", (req, res) => {
      const id = req.params.id;
      Diplome.update(req.body, {
        where: { id: id },
      })
        .then(() => {
          return Diplome.findByPk(id).then((diplome: diplome) => {
            if (diplome === null){
              const message = "Le Diplome demandé n'existe pas. Réessayer avec un autre identifiant."
              return res.status(404).json({message})
            }
              const message = `Le Diplome ${diplome.certificate} a bien été modifié.`;
              res.json({ message, data: diplome });
            })
        })
        .catch((error: ApiException) => {
          if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
          }
          const message = `Le Diplome n'a pas pu être modifié. Réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    });
  };
  