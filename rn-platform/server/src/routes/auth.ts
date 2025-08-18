import { Router } from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { email, password, flname, isSeeker, isSolver } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: 'Email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash, fullName: flname, isSeeker: !!isSeeker, isSolver: !!isSolver } });
  const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({ userId: user.id, email: user.email, fullName: user.fullName, token });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({ userId: user.id, email: user.email, fullName: user.fullName, token, isSolver: user.isSolver });
});