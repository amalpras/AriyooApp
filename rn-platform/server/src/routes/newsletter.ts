import { Router } from 'express';
import { prisma } from '../prisma';

export const newsletterRouter = Router();

newsletterRouter.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'email required' });
  await prisma.newsletter.create({ data: { email } }).catch(() => {});
  res.json({ message: 'ok' });
});