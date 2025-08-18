import { Express } from 'express';
import { authRouter } from './auth';
import { tagsRouter } from './tags';
import { messageRouter } from './message';
import { userRouter } from './user';
import { newsletterRouter } from './newsletter';

export function registerRoutes(app: Express) {
  app.use('/auth', authRouter);
  app.use('/api/Tags', tagsRouter);
  app.use('/api/Message', messageRouter);
  app.use('/api/user', userRouter);
  app.use('/api/newsletter', newsletterRouter);
}