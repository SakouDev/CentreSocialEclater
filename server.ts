import {Response, Request} from 'express'
import './routes'  // test to import from routes/index

import { candidatRouter } from './routes/Candidat/router'
import { employeurRouter } from './routes/Employeur/router'
import { tokenRouter } from './routes/Token/router'
import { userRouter } from './routes/User/router'

const cors = require('cors')
const express = require("express")

const app = express()
const router = express.Router()

app.use(cors())

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

app.use(express.json())
app.use('/api', router)
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
    apis: [`./routes/*/router.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

router.use('/candidats', candidatRouter)
router.use('/users', userRouter)
router.use('/tokens', tokenRouter)
router.use('/employeurs', employeurRouter)

// //Security

// require('./routes/Security/login')(app)
// require('./routes/Security/protected')(app)
// require('./routes/Security/refreshToken')(app)
// require('./routes/Security/logout')(app)

// //Disponibilite

// require('./routes/Disponibilite/findAllDisponibilites')(app)
// require('./routes/Disponibilite/findDisponibiliteByPk')(app)
// require('./routes/Disponibilite/createDisponibilite')(app)
// require('./routes/Disponibilite/updateDisponibilite')(app)
// require('./routes/Disponibilite/deleteDisponibilite')(app)

// //Diplome 

// require('./routes/Diplome/findAllDiplomes')(app)
// require('./routes/Diplome/findDiplomeByPk')(app)
// require('./routes/Diplome/createDiplome')(app)
// require('./routes/Diplome/updateDiplome')(app)
// require('./routes/Diplome/deleteDiplome')(app)

// //Forms

// require('./routes/Forms/formCandidatUpdate')(app)
// require('./routes/Forms/formEmployeurUpdate')(app)


app.use(({res : ApiException}: any) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    return ApiException.status(404).json({message})
})
