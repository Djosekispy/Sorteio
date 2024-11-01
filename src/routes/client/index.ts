import express from 'express';
import { getUserIdFromToken } from '../../http/middleware/getIdFromToken';
import { authController, categoryController, rafflesController, userController } from '../../http/controller/client';
import { authenticateToken } from '../../http/middleware/token';

const rotasDoCliente = express.Router();



//  Rotas de Autenticação
rotasDoCliente.post('/auth/register', authController.cadastrar); 
rotasDoCliente.post('/auth/login', authController.login);         
rotasDoCliente.post('/auth/forgot-password', authController.perdeuSenha);  
rotasDoCliente.post('/auth/reset-password', authController.reporSenhaPerdida); 
rotasDoCliente.get('/auth/logout',authenticateToken, getUserIdFromToken, authController.logout); 

//Rotas de Usuários e Perfis
rotasDoCliente.get('/users/me',authenticateToken,getUserIdFromToken, userController.getUser);
rotasDoCliente.put('/users/me',authenticateToken, getUserIdFromToken, userController.updateUser);
rotasDoCliente.post('/users/request-entity',authenticateToken, getUserIdFromToken, userController.changeProfileStatus);
rotasDoCliente.get('/users/me/participations',authenticateToken, getUserIdFromToken, userController.getHistory);

//Rotas para sorteio
rotasDoCliente.post('/raffles',authenticateToken, getUserIdFromToken, rafflesController.save);
rotasDoCliente.put('/raffles/:sorteioId',authenticateToken, getUserIdFromToken, rafflesController.update);
rotasDoCliente.get('/raffles',rafflesController.showAllAvaliable);
rotasDoCliente.get('/raffles/:sorteioId',rafflesController.showOneById);
rotasDoCliente.get('/raffles/users/yours',authenticateToken, getUserIdFromToken, rafflesController.showAllByUserId);
rotasDoCliente.delete('/raffles/:sorteioId',authenticateToken, getUserIdFromToken, rafflesController.delete);
rotasDoCliente.post('/raffles/:sorteioId/draw',authenticateToken, getUserIdFromToken, rafflesController.draw);
rotasDoCliente.get('/raffles/:sorteioId/winners',authenticateToken, getUserIdFromToken, rafflesController.winners);
rotasDoCliente.post('/raffles/:sorteioId/participate',authenticateToken, getUserIdFromToken, rafflesController.participate);
rotasDoCliente.delete('/raffles/:inscricaoId/participate',authenticateToken, getUserIdFromToken, rafflesController.cancelParticipation);

//Rotas para categorias
rotasDoCliente.post('/categories',authenticateToken, getUserIdFromToken, categoryController.saveCategory);
rotasDoCliente.delete('/categories/:id',authenticateToken, getUserIdFromToken, categoryController.deleteCategory);
rotasDoCliente.put('/categories/:id',authenticateToken, getUserIdFromToken, categoryController.updateCategory);

export default rotasDoCliente;