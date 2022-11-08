import cors from 'cors'
import express from "express"
import swaggerUi from 'swagger-ui-express'
import {Response, Request} from 'express'

const swaggerJsDoc = require('swagger-jsdoc')
const sequelize = require('./database/connect')

const app = express()
app.use(cors())
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

require('./routes/UserRoutes')(app)
require('./routes/DisponibiliteRoutes')(app)
require('./routes/CandidatRoutes')(app)
require('./routes/EmployeurRoutes')(app)
require('./routes/DiplomeRoutes')(app)
require('./routes/TokenRoutes')(app)

//Security

require('./routes/Security/login')(app)
require('./routes/Security/protected')(app)
require('./routes/Security/refreshToken')(app)

//Forms

require('./routes/Forms/formCandidatUpdate')(app)
require('./routes/Forms/formEmployeurUpdate')(app)


app.use(({res : ApiException}: any) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    return ApiException.status(404).json({message})
})
