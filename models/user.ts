
import {  DataTypes, Sequelize, } from "sequelize"


module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('User', {

    
    id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    mail: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail:true, 
            notNull: {msg : 'Le mail est requis'},
            notEmpty: {msg :" L'email est une propriété requise"}
        }
    },
    visibility: {
        type: dataTypes.BOOLEAN,
        defaultValue: true
    },
    password: {
        type: dataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: {msg : 'Le mot de passe est requis'},
        }
    },
    address: {
        type: dataTypes.STRING,
        allowNull: false,
        validate : {
            notNull: {msg : "L'Adresse est requise"},
            notEmpty: {msg :" L'Adresse est une propriété requise"}
        }
    },
    zipCode: {
        type: dataTypes.STRING,
        allowNull: false,
        validate : { 
            isNumeric:true,
            notNull: {msg : 'Le Zipcode est requis'},
            notEmpty: {msg : "Le Zipcode est une propriété requise"}
        }
    },
    city: {
        type: dataTypes.STRING,
        allowNull: false,
        validate : {
            isAlpha:true,
            notNull: {msg : 'La Ville est requise'},
            notEmpty: {msg :" La Ville est une propriété requise"}
        }
    },
    role: {
        type:dataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: dataTypes.STRING,
        allowNull: true,
        validate : {
            isUrl:true
        }
    }, 

})
}
