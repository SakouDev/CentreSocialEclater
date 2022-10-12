const cors = require('cors')
const express = require("express")


const app = express()



app.use(cors())

import { ApiException } from './types/exception'
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

import {Response, Request} from 'express'

app.use(express.json())

// sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

app.get("/", (req :Request, res: Response) => {
    res.send("Ceci est la racine")
})
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'TEMPLATE API',
            description: 'TEMPLATE',
            contact: {
                name: 'Best front-end dev EUW'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:${port}`,
                description: 'localhost'
            },],
        },
    },
    apis: [`./routes/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

require('./routes/findAllUsers')(app)
require('./routes/findUserByPk')(app)
require('./routes/createUser')(app)
require('./routes/updateUser')(app)
require('./routes/deleteUser')(app)

app.use(({res : ApiException}: any) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    return ApiException.status(404).json({message})
})




