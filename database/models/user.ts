import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    
    return sequelize.define('Candidat', {
        id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        },
        phone: {
            type: dataTypes.STRING,
            allowNull: true,
            unique: true,
            validate : {
                isNumeric:true,
            }
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Prénom. Cette valeur est requise'},
                notEmpty : {msg : 'Le Prénom ne peut être vide'}
            }
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Nom. Cette valeur est requise'},
                notEmpty : {msg : 'Le Nom ne peut être vide'}
            }
        },
        birthday: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Date de naissance. Cette valeur est requise'},
                notEmpty : {msg : 'La Date de naissance ne peut être vide'}
            }
        },
        UserId: {
            type: dataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: false, 
        },
    })
}
