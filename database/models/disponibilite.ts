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
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Disponibilit√©. Cette valeur est requise'},
                notEmpty : {msg : 'La Disponibilit√© ne peut √™tre vide'}
            }
        }
    })
}
