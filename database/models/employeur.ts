import {  DataTypes, Sequelize } from "sequelize"


module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    
    return sequelize.define('Employeur', {
        id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : "Veuillez entrer votre nom d'entreprise. Cette valeur est requise"},
                notEmpty : {msg : "Le nom d'entreprise ne peut être vide"}
            }
        },
        siret: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre SIRET. Cette valeur est requise'},
                notEmpty : {msg : 'La SIRET ne peut être vide'}
            }
        },
        UserId: {
            type: dataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: false, 
            },
    })
}