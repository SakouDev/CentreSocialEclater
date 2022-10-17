const cors = require('cors')
const express = require("express")

const app = express()

app.use(cors())

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

import {Response, Request} from 'express'

app.use(express.json())
sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

app.get("/", (req :Request, res: Response) => {
    res.send("Pour obtenir le swagger, rendez-vous sur localhost:5000/api/docs")
})
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API ECLATER',
            description: 'API mise en place pour le projet CDA',
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

require('./routes/User/findAllUsers')(app)
require('./routes/User/findUserByPk')(app)
require('./routes/User/createUser')(app)
require('./routes/User/updateUser')(app)
require('./routes/User/deleteUser')(app)

app.use(({res : ApiException}: any) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    return ApiException.status(404).json({message})
})
