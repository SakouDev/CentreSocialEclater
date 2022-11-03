const cors = require('cors')
const express = require("express")

const app = express()

app.use(cors())

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
    apis: [`./routes/*/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Security

require('./routes/Security/login')(app)
require('./routes/Security/protected')(app)

//Users

require('./routes/User/findAllUsers')(app)
require('./routes/User/findUserByPk')(app)
require('./routes/User/createUser')(app)
require('./routes/User/updateUser')(app)
require('./routes/User/deleteUser')(app) 

//Disponibilite

require('./routes/Disponibilite/findAllDisponibilites')(app)
require('./routes/Disponibilite/findDisponibiliteByPk')(app)
require('./routes/Disponibilite/createDisponibilite')(app)
require('./routes/Disponibilite/updateDisponibilite')(app)
require('./routes/Disponibilite/deleteDisponibilite')(app)

//Candidats

require('./routes/Candidat/findAllCandidats')(app)
require('./routes/Candidat/findCandidatByPk')(app)
require('./routes/Candidat/createCandidat')(app)
require('./routes/Candidat/updateCandidat')(app)
require('./routes/Candidat/deleteCandidat')(app)

// Employeur

require('./routes/Employeur/findAllEmployeurs')(app)
require('./routes/Employeur/findEmployeurByPk')(app)
require('./routes/Employeur/createEmployeur')(app)
require('./routes/Employeur/updateEmployeur')(app)
require('./routes/Employeur/deleteEmployeur')(app)

//Diplome 

require('./routes/Diplome/findAllDiplomes')(app)
require('./routes/Diplome/findDiplomeByPk')(app)
require('./routes/Diplome/createDiplome')(app)
require('./routes/Diplome/updateDiplome')(app)
require('./routes/Diplome/deleteDiplome')(app)

//Token 

require('./routes/Token/findAllTokens')(app)
require('./routes/Token/findTokenByPk')(app)
require('./routes/Token/createToken')(app)
require('./routes/Token/updateToken')(app)
require('./routes/Token/deleteToken')(app)

//Forms

require('./routes/Forms/formCandidatUpdate')(app)
require('./routes/Forms/formEmployeurUpdate')(app)


app.use(({res : ApiException}: any) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    return ApiException.status(404).json({message})
})
