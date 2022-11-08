
import {  DataTypes } from "sequelize"
import {sequelize} from "../connect"

export const Employeur = sequelize.define('Employeur', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : "Veuillez entrer votre nom d'entreprise. Cette valeur est requise"},
                notEmpty : {msg : "Le nom d'entreprise ne peut être vide"}
            }
        },
        siret: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre SIRET. Cette valeur est requise'},
                notEmpty : {msg : 'La SIRET ne peut être vide'}
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: false, 
            },
    })
