
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
    },
    zipCode: {
        type: dataTypes.INTEGER,
    },
    city: {
        type: dataTypes.STRING,
    },
    role: {
        type:dataTypes.STRING,
        allowNull: true,
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
