// const DB = require('pg').Pool

import { stringify } from "querystring"
import { DataTypes } from "sequelize"
import { candidat } from "../types/candidat"
import { wowTemplate } from "../types/template"
const {Sequelize} = require('sequelize')


let users = require('../database/mock/mock-user')
let candidats = require('../database/mock/mock-candidat')

const UserModel = require('../models/users')
const CandidatModel = require('../models/candidat')

const sequelize = new Sequelize (
    'TestForVincent',
    'Test',
    '12344',
    {
        host:'localhost',
        dialect:'postgres',
        port: 5432,
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        }
    }
)

sequelize.authenticate()
    .then(() => console.log("La connextion à la base de donnée à bien était établie"))
    .catch((error : Error) => console.error(`Impossible de se connecter à la base de données ${error}`)
    )

const User = UserModel(sequelize, DataTypes)
const Candidat = CandidatModel(sequelize, DataTypes)

const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: wowTemplate) => {
                User.create({
                    name: user.name,
                    mail: user.mail,
                    description: user.description,
                    image: user.image
                }).then((Luc: { toJSON: () => string }) => console.log(Luc.toJSON()))
            })

            candidats.map((candidat: candidat) => {
                Candidat.create({
                    firstName: candidat.firstName,
                    lastName: candidat.lastName,
                    birthday: candidat.birthday
                }).then((Luc: { toJSON: () => string }) => console.log(Luc.toJSON()))
            })
            console.log('La base de donné user a bien été initialisée !')
    })
}


module.exports = {
    initDb, User, Candidat
}