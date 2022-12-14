import { DataTypes, Sequelize } from "sequelize"
import { DBlogs } from "../Config";

//Table
import { user } from "../types/user";
const UserModel = require("./models/user");
let users = require("./mock/mock-user");

import { candidat } from "../types/candidat";
const CandidatModel = require("./models/candidat");
let candidats = require("./mock/mock-candidat");

import { employeur } from "../types/employeur";
const EmployeurModel = require("./models/employeur");
let employeurs = require("./mock/mock-employeur");

import { diplome } from "../types/diplome";
const DiplomeModel = require("./models/diplome");
let diplomes = require("./mock/mock-diplome");

import { disponibilite } from "../types/disponibilite";
const DisponibiliteModel = require("./models/disponibilite");
let disponibilites = require("./mock/mock-disponibilite");

import { token } from "../types/token";
const TokenModel = require("./models/token");
let tokens = require("./mock/mock-token");

//Table Jointure
const UserDispoModel = require("./models/user-disponibilite");
const UserDiplomeModel = require("./models/user-diplome");

//Connexion Database
export const sequelize = new Sequelize(`${DBlogs.dialect}://${DBlogs.user}:${DBlogs.password}@${DBlogs.host}:${DBlogs.port}/${DBlogs.database}`);

sequelize
	.authenticate()
	.then(() =>
		console.log("La connextion à la base de donnée à bien était établie")
	)
	.catch((error: Error) =>
		console.error(`Impossible de se connecter à la base de données ${error}`)
	);

//Table
export const User = UserModel(sequelize, DataTypes)
export const Candidat = CandidatModel(sequelize, DataTypes)
export const Employeur = EmployeurModel(sequelize, DataTypes)
export const Diplome = DiplomeModel(sequelize, DataTypes)
export const Disponibilite = DisponibiliteModel(sequelize, DataTypes)
export const Token = TokenModel(sequelize, DataTypes)

//Table Jointure
export const UserDispo = UserDispoModel(sequelize, DataTypes)
export const UserDiplome = UserDiplomeModel(sequelize, DataTypes)


//UserDispo --> Jointure entre Disponibilite et User
User.belongsToMany(Disponibilite, { through: UserDispo });
Disponibilite.belongsToMany(User, { through: UserDispo });

//UserDiplome --> Jointure entre Diplome et User
User.belongsToMany(Diplome, { through: UserDiplome });
Diplome.belongsToMany(User, { through: UserDiplome });

User.hasOne(Token);
Token.belongsTo(User);

User.hasOne(Candidat, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Candidat.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasOne(Employeur);
Employeur.belongsTo(User);

export const initDb = () => {

    return sequelize.sync({force: true}).then(()=> {

        
        diplomes.map((diplome: diplome) => {
            Diplome.create({
                certificate: diplome.certificate
            }).then((Luc: { toJSON: () => string}) => console.log(Luc.toJSON()))
        })

        tokens.map((token: token) => {
            Token.create({
                token: token.token,
                tokenPush : token.tokenPush
            }).then((Luc: { toJSON: () => string}) => console.log(Luc.toJSON()))
        })
        
        disponibilites.map((disponibilite: disponibilite) => {
            Disponibilite.create({
                namePeriod: disponibilite.namePeriod
            }).then((Luc: { toJSON: () => string}) => console.log(Luc.toJSON()))
        })
        
        users.map((user: user, index : number) => {
            User.create({
                mail: user.mail,
                visibility: user.visibility,
                password: user.password,
                address: user.address,
                zipCode: user.zipCode,
                city: user.city,
                role: user.role,
                image: user.image
            }).then(async(req : any) => {

                console.log(req.toJSON())
                for (let i=0; i<10; i++){
                    const DisponibiliteRow = await Disponibilite.findByPk(Math.floor(Math.random() * (Object.keys(Disponibilite).length - 1 + 1) + 1));
                    await req.addDisponibilite(DisponibiliteRow, { through: UserDispo })
                }
                const DiplomeRow = await Diplome.findByPk( index + 1 );
                await req.addDiplome(DiplomeRow, { through: UserDiplome })
            })
        })

        candidats.map((candidat: candidat) => {
            Candidat.create({
                UserId : candidat.UserId,
                firstName: candidat.firstName,
                lastName: candidat.lastName,
                birthday: candidat.birthday
            }).then(async(req : any, index : number) => {
                console.log(req.toJSON())

                // const UserRow = await User.findByPk(candidat.userId);
                // await req.addUser(UserRow)

            })
        })

        employeurs.map((employeur: employeur) => {
            Employeur.create({
                UserId : employeur.UserId,
                name: employeur.name,
                siret: employeur.siret
            }).then((Luc: { toJSON: () => string }) => console.log(Luc.toJSON()))
        })

        console.log('La base de donné user a bien été initialisée !')
    })
}