
import {  DataTypes, Sequelize, STRING } from "sequelize"


module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('User', {

    
    id: {
       type: dataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true, 
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg : 'Veuillez entrer votre nom cette valeur est requise'},
            notEmpty : {msg : 'Le nom ne peut être vide'}
        }
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
    description: {
        type: dataTypes.STRING,
    },
    image: {
        type: dataTypes.STRING,
        validate : {
            isUrl:true
        }
    }, 
})
}
