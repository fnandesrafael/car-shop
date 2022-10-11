import express from 'express';
import 'express-async-errors';
import CarRouter from './routes/car.routes';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());
app.use(CarRouter);
app.use(errorHandler);

export default app;
