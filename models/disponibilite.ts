import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('Disponibilite', {

        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        namePeriod: {
            type: dataTypes.STRING,
        }

    })
}