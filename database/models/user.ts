import {  DataTypes, Sequelize } from "sequelize"
import {sequelize} from "../connect"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	return sequelize.define("User",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			mail: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					notNull: { msg: "Le mail est requis" },
					notEmpty: { msg: " L'email est une propriété requise" },
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
				validate: {
					isNumeric: true,
				},
			},
			visibility: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Le mot de passe est requis" },
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "L'Adresse est requise" },
					notEmpty: { msg: " L'Adresse est une propriété requise" },
				},
			},
			zipCode: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Le code Postal est requis" },
					notEmpty: { msg: "Le code Postal est une propriété requise" },
				},
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "La Ville est requise" },
					notEmpty: { msg: " La Ville est une propriété requise" },
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isUrl: true,
				},
			},
		},
		{
			modelName: "user",
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withPassword: {
					attributes: { include: ["password"] },
				},
			},
		}
	);}