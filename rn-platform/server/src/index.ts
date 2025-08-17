import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { Server } from 'socket.io';
import { config } from './config';
import { registerRoutes } from './routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), config.uploadDir)));

registerRoutes(app);

io.on('connection', socket => {
  socket.on('join', (sessionId: string) => {
    socket.join(`session-${sessionId}`);
  });
  socket.on('message', (payload) => {
    io.to(`session-${payload.sessionId}`).emit('message', payload);
  });
});

server.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});