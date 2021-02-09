import express from 'express';
import http from 'http';
import next from 'next';
import cors from 'cors';
const app = express();
const server = http.createServer(app);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const PORT = process.env.PORT ?? 3000;
const nextHandler = nextApp.getRequestHandler();
import { socketMiddleware } from '@/intellichat/package/socketIO/index';

export function start(): void {
  nextApp.prepare().then(() => {
    socketMiddleware(server);
    app.use(
      cors({
        origin: '*',
      })
    );
    app.post('*', (req, res) => {
      return nextHandler(req, res);
    });
    app.get('*', (req, res) => {
      return nextHandler(req, res);
    });
    app.put('*', (req, res) => {
      return nextHandler(req, res);
    });
    app.delete('*', (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(PORT, () => {
      console.log(`Ready on http://localhost:${PORT}`);
    });
  });
}
