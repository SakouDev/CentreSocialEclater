import { DataTypes } from "sequelize"
let users = require('../database/mock-user')
const {Sequelize} = require('sequelize')
const UserModel = require('../models/users')

const DBlogs = {
    dialect: "postgres",
    user: "cdrhvogb",
    host: "lucky.db.elephantsql.com",
    database: "cdrhvogb",
    password: "rFfb3frDZJJaKvCgXX3IOwv1Euzh09Lr",
    port: 5432,
}

const sequelize = new Sequelize(`${DBlogs.dialect}://${DBlogs.user}:${DBlogs.password}@${DBlogs.host}:${DBlogs.port}/${DBlogs.database}`);

sequelize.authenticate()
    .then(() => console.log("La connextion à la base de donnée à bien était établie"))
    .catch((error : Error) => console.error(`Impossible de se connecter à la base de données ${error}`)
    )

const Person = UserModel(sequelize, DataTypes)

   
const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: { name: string; mail: string; description: string; image: string; }) => {
                Person.create({
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
    initDb, Person
}
