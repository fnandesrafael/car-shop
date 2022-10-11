import { Router } from 'express';
import CarController from '../controllers/CarController';

const router = Router();

const carController = new CarController();

router.post('/cars', (req, res) => carController.create(req, res));
router.get('/cars', (req, res) => carController.read(req, res));

export default router;