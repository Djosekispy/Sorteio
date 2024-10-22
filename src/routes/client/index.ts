import express from 'express';
import { authController } from './bootstrap';
import { getUserIdFromToken } from '../../http/middleware/getIdFromToken';

const rotasDoCliente = express.Router();



// Definindo as rotas para o AuthController
rotasDoCliente.post('auth/register', authController.cadastrar); 
rotasDoCliente.post('auth/login', authController.login);         
rotasDoCliente.post('auth/forgot-password', authController.perdeuSenha);  
rotasDoCliente.post('auth/reset-password', authController.reporSenhaPerdida); 
rotasDoCliente.get('auth/logout',getUserIdFromToken, authController.logout); 



export default rotasDoCliente;