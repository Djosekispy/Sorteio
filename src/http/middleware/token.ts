import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../../config/variables.env';
import Usuario from '../../database/model/usuario';

interface CustomJwtPayload extends jwt.JwtPayload {
  id: number;
  sessionId: string;
}

// Função para gerar o token e registrar a sessão no banco de dados
async function generateToken(user: { id: number }) {
  const sessionId = generateSessionId();
  const generatedToken = jwt.sign({ id: user.id, sessionId }, JWT_SECRET as string, { expiresIn: '2h' });
  await  Usuario.update(user.id,{token_acesso : generatedToken})
  return generatedToken;
}

// Middleware para autenticar o token JWT
async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;

    // Verifica se a sessão existe no banco de dados
    const sessionExists = await Usuario.findById(decoded.id);
    if (sessionExists?.token_acesso !== token ) {
      return res.status(403).json({ message: 'Token inválido ou sessão expirada' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

// Middleware para renovar o token JWT
async function renewToken(req: Request, res: Response) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;

    // Remove a sessão antiga
    const sessionState = await Usuario.findById(decoded.id);
    if(!sessionState?.token_acesso) return res.status(403).json({ message: 'Token inválido ou expirado' });

    // Gera um novo token e registra uma nova sessão
    const newToken = await generateToken({ id: decoded.id });
    await Usuario.update(decoded.id,{token_acesso : String(newToken) });

    return res.status(201).json({ token: newToken });
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' + err });
  }
}

// Função para logout, removendo a sessão do banco de dados
async function logout(req: Request, res: Response) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;

    
    await Usuario.update(decoded.id,{token_acesso : '' });

    return res.status(200).json({ message: 'Logout bem-sucedido, sessão encerrada' });
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

// Função auxiliar para gerar um ID de sessão
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export { renewToken, authenticateToken, generateToken, logout, generateSessionId };
