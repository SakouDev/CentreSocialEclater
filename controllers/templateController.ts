import { wowTemplate } from "../types/template"
const { User } = require('../database/connect')

import { ErrorRequestHandler, Request, Response } from "express"
import { BadRequestException, NotFoundException } from "../middleware/exception"

const sequelize = require("../database/connect")
// const queries = require("../queries/templateQueries")

const getTemplate = (req:Request, res: Response) => {
    sequelize.query(User.findAll(), (error:ErrorRequestHandler, result:any) => {
        try {
            if(error) throw error
            res.status(200).json(result.rows)
        } catch (error) {
            res.send(error)
        }
    })
}

// const getTemplateById = (req:Request, res: Response) => {
//     const id = Number(req.params.id)
//     sequelize.query(queries.getTemplateById, [id], (error:ErrorRequestHandler, result:any) => {
//         try {
//             if(!Number.isInteger(id)) throw new BadRequestException("ID non trouvé")
//             const noTemplateFound = !result.rows.length
//             if(noTemplateFound) throw new NotFoundException("Impossible de lire un ID inexistant")
//             res.status(200).json(result.rows)
//         } catch (error) {
//             res.send(error)
//         }
//     })
// }

// const addTemplate = (req :Request, res: Response) => {
//     const { name, mail, description, image } = req.body
//     //Add
//     sequelize.query(queries.addTemplate, [name, mail, description, image], (error:ErrorRequestHandler, result:any) => {
//         try {
//             if(error) throw error
//             res.status(200).send("Created Succesfully!")
//         } catch (error) {
//             res.send(error)
//         }
//     })
// }

// const updateTemplate = (req :Request, res: Response) => {
//     const id = parseInt(req.params.id)
//     const { name, mail, description, image } = req.body

//     sequelize.query(queries.getTemplateById, [id], (error:ErrorRequestHandler, result:any) => {

//         try {

//             if(!Number.isInteger(id)) throw new BadRequestException("ID non trouvé")
//             const noTemplateFound = !result.rows.length
//             if(noTemplateFound) throw new NotFoundException("Impossible de modifier un ID inexistant")

//             sequelize.query(queries.updateTemplate, [name, mail, description, image , id], (error:ErrorRequestHandler, result:any) => {
//                 if (error) throw error
//                 res.status(200).send("Updated ! (Faster than LostArk Update !)")
//             })

//         } catch (error) {
//             res.send(error)
//         }
        
//     })
// }

// const deleteTemplate = (req :Request, res: Response) => {
//     const id = parseInt(req.params.id)
    
    
//     sequelize.query(queries.getTemplateById, [id], (error:ErrorRequestHandler, result:any) => {

//         try {
//             if(!Number.isInteger(id)) throw new BadRequestException("ID non trouvé")
//             const noTemplateFound = !result.rows.length
//             if(noTemplateFound) throw new NotFoundException("Impossible de supprimé un ID inexistant")
            
//             // Delete the templates
//             sequelize.query(queries.deleteTemplate, [id], (error:ErrorRequestHandler, result:any) =>{
//                 if (error) throw error
//                 res.status(200).send("templates Deleted.. CHEH!")
//             })
//         } catch (error) {
//             res.send(error)
//         }
//     })
// }

module.exports = {
    getTemplate,
    // getTemplateById,
    // addTemplate,
    // updateTemplate,
    // deleteTemplate
}