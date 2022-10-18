
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
    phone: {
        type: dataTypes.STRING,
        allowNull: true,
        unique: true,
        validate : {
            isNumeric:true,
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
        validate:{
            notNull: {msg : `L'addresse est requise`},
        }
    },
    zipCode: {
        type: dataTypes.STRING,
        validate:{
            isNumeric:true,
            notNull: {msg : `Le code postal est requis`},
        }
    },
    city: {
        type: dataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true,
            notNull: {msg : `La ville est requise`},
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
