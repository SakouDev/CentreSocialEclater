// const DB = require('pg').Pool

import { stringify } from "querystring"
import { DataTypes } from "sequelize"
let users = require('../database/mock-user')
const {Sequelize} = require('sequelize')
const UserModel = require('../models/users')

const sequelize = new Sequelize (
    'TestForTemplates',
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

    
const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: { name: string; mail: string; description: string; image: string; }) => {
                User.create({
                    name: user.name,
                    mail: user.mail,
                    description: user.description,
                    image: user.image
                }).then((alexis: { toJSON: () => string }) => console.log(alexis.toJSON()))
            })
            console.log('La base de donné user a bien été initialisée !')
    })
}


module.exports = {
    initDb, User
}