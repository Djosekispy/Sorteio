import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../../config/variables.env';
import Administrador from '../../database/model/administrador';

interface CustomJwtPayload extends jwt.JwtPayload {
  id: number;
  sessionId: string;
}

async function generateTokenAdmin(user: { id: number }) {
  const sessionId = generateSessionIdAdmin();
  const generatedToken = jwt.sign({ id: user.id, sessionId }, JWT_SECRET as string, { expiresIn: '2h' });
  await  Administrador.update(user.id,{token_acesso : generatedToken})
  return generatedToken;
}

async function authenticateTokenAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;

    const sessionExists = await Administrador.findById(decoded.id);
    if (sessionExists?.token_acesso !== token ) {
      return res.status(403).json({ message: 'Token inválido ou sessão expirada' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

async function renewTokenAdmim(req: Request, res: Response) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;

    const sessionState = await Administrador.findById(decoded.id);
    if(!sessionState?.token_acesso) return res.status(403).json({ message: 'Token inválido ou expirado' });

    const newToken = await generateTokenAdmin({ id: decoded.id });
    await Administrador.update(decoded.id,{token_acesso : String(newToken) });

    return res.status(201).json({ token: newToken });
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' + err });
  }
}

async function logoutAdmin(req: Request, res: Response) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;

    
    await Administrador.update(decoded.id,{token_acesso : '' });

    return res.status(200).json({ message: 'Logout bem-sucedido, sessão encerrada' });
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

function generateSessionIdAdmin() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export { renewTokenAdmim, authenticateTokenAdmin, generateTokenAdmin, logoutAdmin, generateSessionIdAdmin };
