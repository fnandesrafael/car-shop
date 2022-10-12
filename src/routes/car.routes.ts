import { Router } from 'express';
import CarController from '../controllers/CarController';

const router = Router();

const carController = new CarController();

router.post('/cars', (req, res) => carController.create(req, res));
router.get('/cars', (req, res) => carController.read(req, res));
router.get('/cars/:id', (req, res) => carController.readOne(req, res));
router.put('/cars/:id', (req, res) => carController.update(req, res));
router.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default router;