import { DataTypes } from "sequelize"
const {Sequelize} = require('sequelize')


import { user } from "../types/user"
const UserModel = require('../models/user')
let users = require('../database/mock/mock-user')

import { candidat } from "../types/candidat"
const CandidatModel = require('../models/candidat')
let candidats = require('../database/mock/mock-candidat')

import { employeur } from "../types/employeur"
const EmployeurModel = require('../models/employeur')
let employeurs = require('../database/mock/mock-employeur')

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
const Employeur = EmployeurModel(sequelize, DataTypes)

const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: user) => {
                User.create({
                    mail: user.mail,
                    visibility: user.visibility,
                    password: user.password,
                    address: user.address,
                    zipCode: user.zipCode,
                    city: user.city,
                    role: user.role,
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

            employeurs.map((employeur: employeur) => {
                Employeur.create({
                    name: employeur.name,
                    siret: employeur.siret
                }).then((Luc: { toJSON: () => string }) => console.log(Luc.toJSON()))
            })




            console.log('La base de donné user a bien été initialisée !')
    })
}


module.exports = {
    initDb, User, Candidat, Employeur
}