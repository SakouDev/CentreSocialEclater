import {  DataTypes } from "sequelize"
import {sequelize} from "../connect"

export const Disponibilite = sequelize.define('Disponibilite', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        namePeriod: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : 'Veuillez entrer votre Disponibilité. Cette valeur est requise'},
                notEmpty : {msg : 'La Disponibilité ne peut être vide'}
            }
        }

    })