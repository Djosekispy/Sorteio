import express from 'express';
import { authController, userController } from './bootstrap';
import { getUserIdFromToken } from '../../http/middleware/getIdFromToken';

const rotasDoCliente = express.Router();



//  Rotas de Autenticação
rotasDoCliente.post('/auth/register', authController.cadastrar); 
rotasDoCliente.post('/auth/login', authController.login);         
rotasDoCliente.post('/auth/forgot-password', authController.perdeuSenha);  
rotasDoCliente.post('/auth/reset-password', authController.reporSenhaPerdida); 
rotasDoCliente.get('/auth/logout',getUserIdFromToken, authController.logout); 

//Rotas de Usuários e Perfis
rotasDoCliente.get('/users/me',getUserIdFromToken, userController.getUser);
rotasDoCliente.put('/users/me',getUserIdFromToken, userController.updateUser);
rotasDoCliente.post('/users/request-entity',getUserIdFromToken, userController.changeProfileStatus);
rotasDoCliente.post('/users/me/participations',getUserIdFromToken, userController.getHistory);





export default rotasDoCliente;