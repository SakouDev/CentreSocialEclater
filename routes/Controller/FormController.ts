import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { candidat } from "../../types/candidat";
import { diplome } from "../../types/diplome";
import { disponibilite } from "../../types/disponibilite";
import { ApiException } from "../../types/exception";
import { employeur } from "../../types/employeur";
import bcrypt from 'bcrypt';

const { Employeur, Candidat, User, Disponibilite, UserDispo, Diplome, UserDiplome } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Form
 *      description: Manage les routes Form
 */

/**
  * @openapi
  * /api/form/candidat/{id}:
  *  put:
  *      tags: [Form]
  *      description: Crée un candidat
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default : 1
  *       - name: JSON
  *         in: body
  *         required: true  
  *         type: object
  *         default: {"Candidat" : {"firstName": "Luc","lastName": "Vigneron","birthday": "27/04/1999"},"User": {"mail": "menfou@test.com","visibility": true,"password": "blabla","address": "9 rue du régiment de la chaudière","zipCode": 62200,"city": "Boulogne-sur Mer","role": "candidat","image": "http://www.rien.com"},"Disponibilite": [{"id": 1},{"id": 4},{"id": 7}],"Diplome" : [{"id" : 2},{"id" : 4}]}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
 export const formCandidat = async (req: Request, res: Response) => {
        req.body.User.password = await bcrypt.hash(req.body.User.password, 10)
        Candidat.update(req.body.Candidat, {where : {id : req.params.id}}).then (() => {        
            Candidat.findByPk(req.params.id).then((candidat: candidat) => {
                User.update(req.body.User, {where : {id : candidat.UserId}}).then(() => {
                    User.findByPk(req.params.id).then((user: any) => {

                        UserDispo.destroy({where: { UserId: user.id }})
                        req.body.Disponibilite?.map( async (DispoMap : disponibilite) => {
                            const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
                            await user.addDisponibilite(DisponibiliteRow, { through: UserDispo })
                        })
                
                        UserDiplome.destroy({ where: { UserId: user.id }})
                        req.body.Diplome?.map( async (DiploMap : diplome) => {
                            const DiplomeRow = await Diplome.findByPk(DiploMap.id);
                            await user.addDiplome(DiplomeRow, { through: UserDiplome })
                        })
                    })
                })
            }) 
        })
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
        }).then((candidats: candidat) => {
        const message : string = 'Le Candidat à bien été mis à jour'
        res.json({message, data: candidats})
        })
        .catch((error : ApiException) => {
        if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
        }
        const message = `Le Candidat n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
        })
    }

/**
  * @openapi
  * /api/form/employeur/{id}:
  *  put:
  *      tags: [Form]
  *      description: Crée un employeur
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default : 1
  *       - name: JSON
  *         in: body
  *         required: true  
  *         type: object
  *         default: {"Employeur" : {"name": "Simplon","siret": "12356894100789"},"User": {"mail": "test@test.com","visibility": true,"password": "blabla","address": "9 rue du régiment de la chaudière","zipCode": 62200,"city": "Boulogne-sur Mer","role": "Employeur","image": "http://www.rien.com"},"Disponibilite": [{"id": 1},{"id": 4},{"id": 7}]}
  *      responses:
  *        200:
  *          description: La requête s'est bien déroulé
  */
 export const formEmployeur = async (req: Request, res: Response) => {
        req.body.User.password = await bcrypt.hash(req.body.User.password, 10)
      
        Employeur.update(req.body.Employeur, {where : {id : req.params.id}}).then ((employeurmenfou : any) => {        
            Employeur.findByPk(req.params.id).then((employeur: employeur) => {
                User.update(req.body.User, {where : {id : employeur.UserId}}).then((usermenfou : any) => {
                    User.findByPk(req.params.id).then((user: any) => {

                        UserDispo.destroy({where: { UserId: user.id }})
                        req.body.Disponibilite?.map( async (DispoMap : disponibilite) => {
                            const DisponibiliteRow = await Disponibilite.findByPk(DispoMap.id);
                            await user.addDisponibilite(DisponibiliteRow, { through: UserDispo })
                        })
                    })
                })
            }) 
        })
        Employeur.findByPk(req.params.id, {
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
        }).then((employeurs: employeur) => {
        const message : string = `L'Employeur à bien été mis à jour`
        res.json({message, data: employeurs})
        })
        .catch((error : ApiException) => {
        if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
        }
        const message = `L'Employeur n'a pas pu être ajouté. Réessayer dans quelques instants.`
        res.status(500).json({message, data : error})
        })
    }
