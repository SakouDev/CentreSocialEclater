import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('Diplome', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        certificate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer un Certificat. Cette valeur est requise'},
                notEmpty : {msg : 'Le Certificat ne peut être vide'}
            }
        }

    })}