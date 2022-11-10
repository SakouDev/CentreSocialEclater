import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { disponibilite } from "../../types/disponibilite";
import { employeur } from "../../types/employeur";
import { ApiException } from "../../types/exception";
import bcrypt from 'bcrypt';
import { employeurId } from "../../types/employeur";
import { Employeur, User, Disponibilite, UserDispo } from "../../database/connect";

/**
 * @swagger
 * tags:
 *      name: Employeurs
 *      description: Manage les routes Employeur
 */

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
  *         default: {"Employeur" : {"name": "Simplon", "siret": "12356894100789"},"User": {"mail": "test@test.com", "visibility": true, "password": "blabla", "address": "9 rue du régiment de la chaudière", "zipCode": 62200, "city": "Boulogne-sur Mer", "role": "Employeur", "image": "http://www.rien.com"},"Disponibilite": [{"id": 1},{"id": 4},{"id": 7}]}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
 export const addEmployeur = async (req: Request, res: Response) => {
    req.body.User.password = await bcrypt.hash(req.body.User.password, 10)
    User.create(req.body.User).then((user : any) => {
      Employeur.create(req.body.Employeur).then ((employeur : any) => {
        employeur.setUser(user)
      })
      req.body.Disponibilite.map( async (DispoMap : disponibilite) => {
        const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
        await user.addDisponibilite(DisponibiliteRow, { through: UserDispo })
      })
    })
    .then((employeurs : employeur) => {
      const message : string = "L'Employeur à bien été crée"
      res.json({message, data: employeurs})
    })
    .catch((error : ApiException) => {
      if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data : error})
      }
      const message = `L'Employeur n'a pas pu être ajouté. Réessayer dans quelques instants.`
      res.status(500).json({message, data : error})
    })
  };

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
  *         default: {"Employeur": {"name": "ECLATER", "siret": "231564156D125"}, "User": {"mail": "menfou@test.com", "visibility": true, "password": "blabla", "address": "9 rue du régiment de la chaudière", "zipCode": 62200, "city": "Boulogne-sur Mer", "role": "Employeur", "image": "http://www.rien.com/%22%7D"}, "Disponibilite": [{"id": 1}, {"id": 4}, {"id": 7}]}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé.
  */
 export const removeEmployeur = async (req: Request, res: Response) => {
      Employeur.findByPk(req.params.id).then((employeur: employeurId) => {
        if (employeur === null){
          const message = "L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }
  
        const employeurDeleted = employeur;
        return  User.destroy({
          where: { id : employeur.UserId }
        })
        .then(() => {
          const message = `L'Employeur avec l'identifiant n°${employeurDeleted.id} a bien été supprimé.`
          res.json({message, data: employeurDeleted })
        })
      })
      .catch((error: ApiException) => {
        const message = `L'Employeur n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
    }

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
   export const getAllEmployeur = async (req: Request, res: Response) => {
        Employeur.findAll({include: [
			{
				model : User,
				required : false,
			}
		]})
        .then((employeurs : employeur) => {
            const message : string = 'La liste des Employeurs à bien était récuperée.'
            res.json({message, data: employeurs})
        })
        .catch((error : ApiException) => {
            const message = `La liste des Employeurs n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    }


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
 export const getByIdEmployeur = async (req: Request, res: Response) => {
      Employeur.findByPk(req.params.id, {
        include: [
          {
            model : User,
            required : false,
            include: [
                {
                    model : Disponibilite,
                    required : false
                }
            ]
          }
            ]
      })
      .then((employeur : employeur )=> {
        if (employeur === null){
          const message = "L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant."
          return res.status(404).json({message})
        }
  
        const message : string = 'Un employeur a bien été trouvé.'
        res.json({ message, data: employeur })
      })
      .catch((error : ApiException ) => {
        const message = "L'Employeur demander n'a pas pu être récuperer. Réessayer dans quelques instants."
        res.status(500).json({message, data: error})
      })
    }


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
   export const updateEmployeur = async (req: Request, res: Response) => {
      const id = req.params.id;
      Employeur.update(req.body, {
        where: { id: id },
      })
      .then(() => {
        return Employeur.findByPk(id).then((employeur: employeur) => {
          if (employeur === null){
            const message = "L'Employeur demandé n'existe pas. Réessayer avec un autre identifiant."
            return res.status(404).json({message})
          }
            const message = `L'Employeur ${employeur.name} a bien été modifié.`;
            res.json({ message, data: employeur });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'Employeur n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
    }
  