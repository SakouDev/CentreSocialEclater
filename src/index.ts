import express from "express";
import cors from 'cors';

const app = express();
const routes = require('./routes.ts')
const API_PORT = 5000

app.use(express);
app.use(cors());
app.get("/", (req, res) => { res.send("Connexion Établie") });
app.use('/api/utilisateur', routes);
app.use('/api/auth', routes);
app.listen(API_PORT, () => console.log('Initialisation du BACK-END terminée.'));