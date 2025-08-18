import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

export const userRouter = Router();

userRouter.put('/', requireAuth, async (req: AuthRequest, res) => {
  const { id, fullName, userName, isSolver } = req.body;
  const user = await prisma.user.update({ where: { id }, data: { fullName, userName, isSolver } });
  res.json(user);
});

userRouter.put('/updatepassword', requireAuth, async (req: AuthRequest, res) => {
  res.json({ message: 'noop' });
});