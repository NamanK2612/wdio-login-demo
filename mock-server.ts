import express from 'express';
import { createServer } from 'http';

let server: any;

export async function startMockServer() {
  const app = express();
  app.use(express.json());

  app.post('/login', (req, res) => {
    console.log('Mock server login:', req.body.username);
    if (req.body.username === 'tomsmith') {
      res.json({ token: 'mock-jwt-123', message: 'Login logged successfully' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  server = createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(3000, () => resolve());
  });
}