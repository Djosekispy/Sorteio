import express from 'express';
import { getUserIdFromToken } from '../../http/middleware/getIdFromToken';
import { authController, categoryController, complaintController, itemController, rafflesController, userController } from '../../http/controller/client';
import { authenticateToken } from '../../http/middleware/token';
import { uploadFileMiddleware } from '../../http/middleware/upload';
import { uploadDocumentsMiddleware } from '../../http/middleware/uploadDocuments';

const rotasDoCliente = express.Router();

//  Rotas de Autenticação
rotasDoCliente.post('/auth/register', authController.cadastrar); 
rotasDoCliente.post('/auth/login', authController.login);         
rotasDoCliente.post('/auth/forgot-password', authController.perdeuSenha);  
rotasDoCliente.post('/auth/reset-password', authController.reporSenhaPerdida); 
rotasDoCliente.get('/auth/logout',authenticateToken, getUserIdFromToken, authController.logout); 

// Rotas de Usuários e Perfis
rotasDoCliente.get('/users/me',authenticateToken,getUserIdFromToken, userController.getUser);
rotasDoCliente.put('/update',authenticateToken, getUserIdFromToken,uploadFileMiddleware, userController.updateUser);
rotasDoCliente.put('/users/photo',authenticateToken, getUserIdFromToken,uploadFileMiddleware,userController.updateUserPhoto);
rotasDoCliente.post('/users/request-entity',authenticateToken, getUserIdFromToken, userController.changeProfileStatus);
rotasDoCliente.get('/users/me/participations',authenticateToken, getUserIdFromToken, userController.getHistory);
rotasDoCliente.get('/users/notifications',authenticateToken, getUserIdFromToken, userController.getNotifications);
rotasDoCliente.post('/users/document',authenticateToken, getUserIdFromToken,uploadDocumentsMiddleware, userController.loadDocuments);
rotasDoCliente.put('/users/:id/document',authenticateToken, getUserIdFromToken,uploadDocumentsMiddleware, userController.updateDocument);

// Rotas para sorteio
rotasDoCliente.post('/raffles',authenticateToken, getUserIdFromToken,uploadFileMiddleware, rafflesController.save);
rotasDoCliente.put('/raffles/:sorteioId',authenticateToken, getUserIdFromToken,uploadFileMiddleware, rafflesController.update);
rotasDoCliente.get('/raffles',rafflesController.showAllAvaliable);
rotasDoCliente.get('/raffles/:sorteioId',rafflesController.showOneById);
rotasDoCliente.get('/raffles/users/yours',authenticateToken, getUserIdFromToken, rafflesController.showAllByUserId);
rotasDoCliente.delete('/raffles/:sorteioId',authenticateToken, getUserIdFromToken, rafflesController.delete);
rotasDoCliente.post('/raffles/:sorteioId/draw',authenticateToken, getUserIdFromToken, rafflesController.draw);
rotasDoCliente.get('/raffles/:sorteioId/winners',authenticateToken, getUserIdFromToken, rafflesController.winners);
rotasDoCliente.post('/raffles/:sorteioId/participate',authenticateToken, getUserIdFromToken, rafflesController.participate);
rotasDoCliente.delete('/raffles/:inscricaoId/participate',authenticateToken, getUserIdFromToken, rafflesController.cancelParticipation);
rotasDoCliente.post('/raffles/update-candidate',authenticateToken, getUserIdFromToken, rafflesController.updateCandidateStatus);
rotasDoCliente.get('/raffles/search/:string',rafflesController.searchRaffle);

// Rotas para categorias
rotasDoCliente.post('/categories',authenticateToken, getUserIdFromToken, categoryController.saveCategory);
rotasDoCliente.delete('/categories/:id',authenticateToken, getUserIdFromToken, categoryController.deleteCategory);
rotasDoCliente.put('/categories/:id',authenticateToken, getUserIdFromToken, categoryController.updateCategory);
rotasDoCliente.get('/categories/:id',authenticateToken, getUserIdFromToken, categoryController.showCategorybyId);
rotasDoCliente.get('/categories-all/',authenticateToken, getUserIdFromToken, categoryController.showAllCategory);

// Rotas para Itens
rotasDoCliente.post('/items',authenticateToken, getUserIdFromToken, itemController.saveItem);
rotasDoCliente.put('/items/:id',authenticateToken, getUserIdFromToken, itemController.updateItem);
rotasDoCliente.delete('/items/:id',authenticateToken, getUserIdFromToken, itemController.deleteItem);

// Rotas de Reclamações
rotasDoCliente.post('/complaints',authenticateToken, getUserIdFromToken, complaintController.saveComplaint);
rotasDoCliente.get('/complaints',authenticateToken, getUserIdFromToken, complaintController.getComplaints);
rotasDoCliente.get('/complaints/:sorteioId',authenticateToken, getUserIdFromToken, complaintController.getComplaintsByRaffle);
rotasDoCliente.get('/complaints/user/:userId',authenticateToken, getUserIdFromToken, complaintController.getComplaintsByUser);
rotasDoCliente.post('/complaints/:complaintId/respond',authenticateToken, getUserIdFromToken, complaintController.respondComplaint);

export default rotasDoCliente;
