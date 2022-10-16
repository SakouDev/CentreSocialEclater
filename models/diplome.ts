import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('Diplome', {

        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        certificate: {
            type: dataTypes.STRING,
        }

    })
}