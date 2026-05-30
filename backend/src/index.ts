import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { journalRouter } from './routes/journal.routes.js';
import { workTypesRouter } from './routes/workTypes.routes.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/journal', journalRouter);
app.use('/api/work-types', workTypesRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

app.listen(port, () => {
  console.log(`Backend started on http://localhost:${port}`);
});
