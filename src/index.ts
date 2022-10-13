import express from "express";
import cors from 'cors';

const app = express();
const routes = require('./routes.ts')

app.use(express);
app.use(cors());