import express from 'express';
import CarRouter from './routes/car.routes';

const app = express();

app.use(express.json());
app.use('/car', CarRouter);

export default app;
