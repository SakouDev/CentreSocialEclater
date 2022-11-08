
import {  DataTypes } from "sequelize"
import {sequelize} from "../connect"

export const Candidat = sequelize.define('Candidat', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate : {
                isNumeric:true,
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Prénom. Cette valeur est requise'},
                notEmpty : {msg : 'Le Prénom ne peut être vide'}
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Nom. Cette valeur est requise'},
                notEmpty : {msg : 'Le Nom ne peut être vide'}
            }
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Date de naissance. Cette valeur est requise'},
                notEmpty : {msg : 'La Date de naissance ne peut être vide'}
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: false, 
        },
    })
