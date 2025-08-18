import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

export const tagsRouter = Router();

tagsRouter.get('/getAll', async (_req, res) => {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  res.json(tags.map(t => ({ id: t.id, tagName: t.name, description: 'tag' })));
});

tagsRouter.get('/place', async (_req, res) => {
  const places = await prisma.place.findMany({ orderBy: { name: 'asc' } });
  res.json(places.map(p => ({ id: p.id, placeName: p.name })));
});

tagsRouter.get('/getUserTags/:userId', async (req, res) => {
  const userId = Number(req.params.userId);
  const uts = await prisma.userTag.findMany({ where: { userId }, include: { tag: true } });
  res.json(uts.map(u => ({ tagId: u.tagId, userId, tagName: u.tag.name })));
});

tagsRouter.get('/getUserPlaces/:userId', async (req, res) => {
  const userId = Number(req.params.userId);
  const ups = await prisma.userPlace.findMany({ where: { userId }, include: { place: true } });
  res.json(ups.map(u => ({ placeId: u.placeId, userId, placeName: u.place.name })));
});

tagsRouter.get('/getUserPlaceTags/:userId', async (req, res) => {
  const userId = Number(req.params.userId);
  const pts = await prisma.userPlaceTag.findMany({ where: { userId }, include: { placeTag: true } });
  res.json(pts.map(p => ({ placeTagId: p.placeTagId, userId, tagName: p.placeTag.name })));
});

tagsRouter.post('/addUserTags', requireAuth, async (req: AuthRequest, res) => {
  const payload = req.body as { tagId?: number; tagName?: string; userId: number }[];
  for (const t of payload) {
    let tagId = t.tagId;
    if (!tagId && t.tagName) {
      const created = await prisma.tag.upsert({ where: { name: t.tagName }, update: {}, create: { name: t.tagName } });
      tagId = created.id;
    }
    if (tagId) await prisma.userTag.upsert({ where: { userId_tagId: { userId: t.userId, tagId } }, update: {}, create: { userId: t.userId, tagId } });
  }
  res.json({ message: 'ok' });
});

tagsRouter.post('/addUserPlace', requireAuth, async (req: AuthRequest, res) => {
  const { userId, placeName } = req.body;
  const place = await prisma.place.upsert({ where: { name: placeName }, update: {}, create: { name: placeName } });
  await prisma.userPlace.upsert({ where: { userId_placeId: { userId, placeId: place.id } }, update: {}, create: { userId, placeId: place.id } });
  res.json({ placeId: place.id, userId, placeName: place.name, name: place.name });
});

tagsRouter.post('/addUserPlaceTag', requireAuth, async (req: AuthRequest, res) => {
  const { userId, tagName } = req.body;
  const pt = await prisma.placeTag.upsert({ where: { name: tagName }, update: {}, create: { name: tagName } });
  await prisma.userPlaceTag.upsert({ where: { userId_placeTagId: { userId, placeTagId: pt.id } }, update: {}, create: { userId, placeTagId: pt.id } });
  res.json({ placeTagId: pt.id, userId, tagName: pt.name, name: pt.name });
});

tagsRouter.delete('/deleteUserPlace/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.userPlace.delete({ where: { id } }).catch(() => {});
  res.json({ message: 'ok' });
});

tagsRouter.delete('/deleteUserPlaceTag/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.userPlaceTag.delete({ where: { id } }).catch(() => {});
  res.json({ message: 'ok' });
});

tagsRouter.delete('/deleteUserTag/:userId/:tagId', requireAuth, async (req, res) => {
  const userId = Number(req.params.userId);
  const tagId = Number(req.params.tagId);
  await prisma.userTag.delete({ where: { userId_tagId: { userId, tagId } } }).catch(() => {});
  res.json({ message: 'ok' });
});