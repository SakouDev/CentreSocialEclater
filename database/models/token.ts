
import {  DataTypes } from "sequelize"
import {sequelize} from "../connect"

export const Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : "Veuillez entrer votre Token. Cette valeur est requise"},
                notEmpty : {msg : "Le Token ne peut être vide"}
            }
        },
        tokenPush: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     notNull: { msg : 'Veuillez entrer votre Token. Cette valeur est requise'},
            //     notEmpty : {msg : 'Le Token ne peut être vide'}
            // }
        },
        UserId: {
            type: DataTypes.INTEGER,
        },
    })
