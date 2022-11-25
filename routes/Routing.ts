import { checkAccessToken } from "./Controller/SecurityController";

const { Router } = require('express');
const candidatController = require('./Controller/CandidatController');
const diplomeController = require('./Controller/DiplomeController');
const disponibiliteController = require('./Controller/DisponibiliteController');
const employeurController = require('./Controller/EmployeurController');
const tokenController = require('./Controller/TokenController');
const userController = require('./Controller/UserController'); //DEAD ROUTES
const formController = require('./Controller/FormController')
const securityController = require('./Controller/SecurityController')
const emailController = require('./Controller/EmailController')

export const candidatRoutes = Router();

candidatRoutes.get('/', candidatController.getAllCandidat);
candidatRoutes.post('/', candidatController.addCandidat);
candidatRoutes.get('/:id', candidatController.getByIdCandidat);
candidatRoutes.put('/:id', candidatController.updateCandidat);
candidatRoutes.delete('/:id', candidatController.removeCandidat);

export const diplomeRoutes = Router();

diplomeRoutes.get('/', diplomeController.getAllDiplome);
diplomeRoutes.post('/', diplomeController.addDiplome);
diplomeRoutes.get('/:id', diplomeController.getByIdDiplome);
diplomeRoutes.put('/:id', diplomeController.updateDiplome);
diplomeRoutes.delete('/:id', diplomeController.removeDiplome);

export const disponibiliteRoutes = Router();

disponibiliteRoutes.get('/', disponibiliteController.getAllDisponibilite);
disponibiliteRoutes.post('/', disponibiliteController.addDisponibilite);
disponibiliteRoutes.get('/:id', disponibiliteController.getByIdDisponibilite);
disponibiliteRoutes.put('/:id', disponibiliteController.updateDisponibilite);
disponibiliteRoutes.delete('/:id', disponibiliteController.removeDisponibilite);

export const employeurRoutes = Router();

employeurRoutes.get('/', employeurController.getAllEmployeur);
employeurRoutes.post('/', employeurController.addEmployeur);
employeurRoutes.get('/:id', employeurController.getByIdEmployeur);
employeurRoutes.put('/:id', employeurController.updateEmployeur);
employeurRoutes.delete('/:id', employeurController.removeEmployeur);

export const tokenRoutes = Router();

tokenRoutes.get('/', tokenController.getAllToken);
tokenRoutes.post('/', tokenController.addToken);
tokenRoutes.get('/:id', tokenController.getByIdToken);
tokenRoutes.put('/:id', tokenController.updateToken);
tokenRoutes.delete('/:id', tokenController.removeToken);

export const userRoutes = Router();

userRoutes.get('/', userController.getAllUser);
userRoutes.post('/', userController.addUser);
userRoutes.get('/:id', userController.getByIdUser);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.removeUser);

export const formRoutes = Router();

formRoutes.put('/employeur/:id', formController.formEmployeur);
formRoutes.put('/candidat/:id', formController.formCandidat);

export const securityRoutes = Router();

securityRoutes.post('/login', securityController.loginUser);
securityRoutes.delete('/logout/:id', securityController.logoutUser); //WARNING Possible Conflit
securityRoutes.post('/protected', checkAccessToken, securityController.protectedRoute);
securityRoutes.post('/refreshtoken', securityController.refreshTokens);

export const emailRoutes = Router();

emailRoutes.post('/', emailController.sendEmail);