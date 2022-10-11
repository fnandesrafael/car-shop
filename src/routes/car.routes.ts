import { Router } from 'express';
import CarController from '../controllers/CarController';

const router = Router();

const carController = new CarController();

router.post('/car', (req, res) => carController.create(req, res));

export default router;