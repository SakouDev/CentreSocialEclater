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

import { diplome } from "../types/diplome"
const DiplomeModel = require('../models/diplome')
let diplomes = require('../database/mock/mock-diplome')

import { disponibilite } from "../types/disponibilite"
const DisponibiliteModel = require('../models/disponibilite')
let disponibilites = require('../database/mock/mock-disponibilite')

import { token } from "../types/token"
const TokenModel = require('../models/token')
let tokens = require('../database/mock/mock-token')

// LIAISON 

import { userDispo } from '../types/users-disponibilites'
const UserDispoModel = require("../models/user-disponibilite")
let userDispos = require('../database/mock/mock-users-disponibilites')

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
const Diplome = DiplomeModel(sequelize, DataTypes)
const Disponibilite = DisponibiliteModel(sequelize, DataTypes)
const Token = TokenModel(sequelize, DataTypes)
const UserDispo = UserDispoModel(sequelize, DataTypes)

const initDb = () => {

        User.belongsToMany(Disponibilite, {through: 'Menfou'})
        Disponibilite.belongsToMany(User, {through: 'Menfou'})



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

            diplomes.map((diplome: diplome) => {
                Diplome.create({
                    certificate: diplome.certificate
                }).then((Luc: { toJSON: () => string}) => console.log(Luc.toJSON()))
            })

            disponibilites.map((disponibilite: disponibilite) => {
                Disponibilite.create({
                    namePeriod: disponibilite.namePeriod
                }).then((Luc: { toJSON: () => string}) => console.log(Luc.toJSON()))
            })

            tokens.map((token: token) => {
                Token.create({
                    token: token.token,
                    tokenPush : token.tokenPush
                }).then((Luc: { toJSON: () => string}) => console.log(Luc.toJSON()))
            })

            console.log('La base de donné user a bien été initialisée !')
    })
}


module.exports = {
    initDb, User, Candidat, Employeur
}