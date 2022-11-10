import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { diplome } from "../../types/diplome";
import { disponibilite } from "../../types/disponibilite";
import { ApiException } from "../../types/exception";
import bcrypt from 'bcrypt';
import { Candidat, User, Disponibilite, UserDispo, Diplome, UserDiplome } from "../../database/connect";

/**
 * @swagger
 * tags:
 *      name: Candidats
 *      description: Manage les routes Candidat
 */

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
  *         default: {"Candidat" : {"firstName": "Luc","lastName": "Vigneron","birthday": "27/04/1999"},"User": {"mail": "menfou@test.com","visibility": true,"password": "blabla","address": "9 rue du régiment de la chaudière","zipCode": 62200,"city": "Boulogne-sur Mer","phone": "0122908812","role": "Candidat","image": "http://www.rien.com"},"Disponibilite": [{"id": 1},{"id": 4},{"id": 7}],"Diplome" : [{"id" : 2},{"id" : 4}]}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
export const addCandidat = async (req: Request, res: Response) => {
    req.body.User.password = await bcrypt.hash(req.body.User.password, 10)
    User.create(req.body.User).then((user : any) => {
      Candidat.create(req.body.Candidat).then ((candidat : any) => {
        candidat.setUser(user)
      })
      req.body.Disponibilite?.map( async (DispoMap : disponibilite) => {
        const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
        await user.addDisponibilite(DisponibiliteRow, { through: UserDispo })
      })
      req.body.Diplome?.map( async (DiploMap : diplome) => {
        const DiplomeRow = await Diplome.findByPk(DiploMap.id);
        await user.addDiplome(DiplomeRow, { through: UserDiplome })
      })
    })
    .then((candidats: candidat) => {
      const message : string = "La création du Candidat s'est bien déroulé"
      res.json({message, data: candidats})
    })
    .catch((error : ApiException) => {
      if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data : error})
      }
      const message = `Le Candidat n'a pas pu être ajouté. Réessayer dans quelques instants.`
      res.status(500).json({message, data : error})
    })
  };
  

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
export const removeCandidat = async (req: Request, res: Response) => {
    Candidat.findByPk(req.params.id).then((candidat: any) => {
      
      if (candidat === null){
        const message = "Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant."
        return res.status(404).json({message})
      }

      const candidatDeleted = candidat;
      return(
        User.destroy({
          where: { id: candidat.UserId }
        })
      )
      .then(() => {
        const message = `Le Candidat avec l'identifiant n°${candidatDeleted.id} a bien été supprimé.`
        res.json({message, data: candidatDeleted })
      })
    })
    .catch((error: ApiException) => {
      const message = `Le Candidat n'a pas pu être supprimé. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  }


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
export const getAllCandidat = async (req: Request, res: Response) => {
        Candidat.findAll({include: [
			{
				model : User,
				required : false,
			}
		]})
        .then((candidats: candidat) => {
            const message : string = 'La liste des candidats à bien était récuperée.'
            res.json({message, data: candidats})
        })
        .catch((error : ApiException) => {
            const message = `La liste des candidats n'a pas pu être récupérée. Réessayer dans quelques instants.`
            res.status(500).json({message, data : error})
        })
    }


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
export const getByIdCandidat = async (req: Request, res: Response) => {
        Candidat.findByPk(req.params.id, {
            include : [
                {
                    model : User,
                    required : false,
                    include: [
                        {
                            model : Diplome,
                            required : false
                        },
                        {
                            model : Disponibilite,
                            required : false
                        }
                    ]
                }
            ]
        })
        .then((candidat : candidat )=> {
            if (candidat === null){
                const message = "Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant."
                return res.status(404).json({message})
            }

            const message : string = 'Un Candidat à bien été trouvé.'
            res.json({ message, data: candidat })
        })
        .catch((error : ApiException ) => {
            const message = "Le Candidat demander n'a pas pu être récuperer. Réessayer dans quelques instants."
            res.status(500).json({message, data: error})
        })
    }


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
export const updateCandidat = async (req: Request, res: Response) => {
      const id = req.params.id;
      Candidat.update(req.body, {
        where: { id: id },
      })
        .then(() => {
          return Candidat.findByPk(id).then((candidat: candidat) => {
            if (candidat === null){
              const message = "Le Candidat demandé n'existe pas. Réessayer avec un autre identifiant."
              return res.status(404).json({message})
            }
              const message = `Le Candidat "${candidat.lastName} ${candidat.firstName}" a bien été modifié.`;
              res.json({ message, data: candidat });
            })
        })
        .catch((error: ApiException) => {
          if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
          }
          const message = `Le Candidat n'a pas pu être modifié. Réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    };
  