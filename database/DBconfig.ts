const {Sequelize} = require('sequelize')

//Connexion Database
const sequelize = new Sequelize({
	database: process.env.DB_DATABASE || "TestForVincent",
	username: process.env.DB_USERNAME || "Test",
	password: process.env.DB_PASSWORD || "12344",
	host: process.env.DB_HOST || "localhost",
	dialect: "postgres",
	port: process.env.DB_PORT || 5432,
	dialectOptions: {
		timezone: "Etc/GMT-2",
	},
});

export default sequelize