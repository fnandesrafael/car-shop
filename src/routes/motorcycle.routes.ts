import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';

const routes = Router();

const motorcycleController = new MotorcycleController();

routes.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
routes.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
routes.get('/motorcycles/:id', (req, res) => motorcycleController.readOne(req, res));

export default routes;