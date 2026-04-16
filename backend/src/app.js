import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';
import { healthRouter } from './routes/health.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/health', healthRouter);
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
