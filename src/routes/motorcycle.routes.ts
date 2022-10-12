import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';

const routes = Router();

const motorcycleController = new MotorcycleController();

routes.post('/motorcycles', (req, res) => motorcycleController.create(req, res));

export default routes;