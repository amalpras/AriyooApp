import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';
import multer from 'multer';
import { config } from '../config';
import { scoreMatch } from '../utils/matching';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: config.uploadDir });

export const messageRouter = Router();

messageRouter.post('/postQuestion', requireAuth, async (req: AuthRequest, res) => {
  const { seekerId, message, tag } = req.body as { seekerId: number; message: string; tag: { tagName: string }[] };
  const tags = tag?.map(t => t.tagName) || [];
  const solvers = await prisma.user.findMany({ where: { isSolver: true }, include: { tags: { include: { tag: true } } } });
  let best = solvers.map(s => ({ solverId: s.id, score: scoreMatch(s.tags.map(t => t.tag.name), tags) }))
                   .sort((a,b) => b.score - a.score)[0];
  const solverId = best?.solverId || solvers[0]?.id || seekerId;
  const session = await prisma.session.create({ data: { seekerId, solverId, title: message.slice(0,80) } });
  await prisma.message.create({ data: { sessionId: session.id, senderId: seekerId, messageText: message } });
  res.json({ sessionId: session.id });
});

messageRouter.get('/getallsessionsseeker/:seekerId', requireAuth, async (req, res) => {
  const seekerId = Number(req.params.seekerId);
  const sessions = await prisma.session.findMany({ where: { seekerId }, orderBy: { updatedAt: 'desc' } });
  res.json(sessions.map(s => ({ sessionId: s.id, title: s.title, active: s.active })));
});

messageRouter.get('/getallsessionssolver/:solverId', requireAuth, async (req, res) => {
  const solverId = Number(req.params.solverId);
  const sessions = await prisma.session.findMany({ where: { solverId }, orderBy: { updatedAt: 'desc' } });
  res.json(sessions.map(s => ({ sessionId: s.id, title: s.title, active: s.active })));
});

messageRouter.get('/getMessagesBySessionId/:sessionId', requireAuth, async (req, res) => {
  const sessionId = Number(req.params.sessionId);
  const msgs = await prisma.message.findMany({ where: { sessionId }, orderBy: { createdAt: 'asc' } });
  res.json(msgs);
});

messageRouter.post('/postMessage', requireAuth, async (req: AuthRequest, res) => {
  const { senderId, messageText, sessionId } = req.body as { senderId: number; messageText: string; sessionId: number };
  const msg = await prisma.message.create({ data: { senderId, messageText, sessionId } });
  await prisma.session.update({ where: { id: sessionId }, data: { updatedAt: new Date() } });
  res.json(msg);
});

messageRouter.post('/uploadImage', requireAuth, upload.single('image'), async (req: any, res) => {
  const { senderId, sessionId } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file' });
  const imgUrl = `/uploads/${file.filename}${path.extname(file.originalname)}`;
  const finalPath = path.join(config.uploadDir, `${file.filename}${path.extname(file.originalname)}`);
  fs.renameSync(file.path, finalPath);
  const msg = await prisma.message.create({ data: { senderId: Number(senderId), sessionId: Number(sessionId), imageUrl: imgUrl } });
  res.json(msg);
});