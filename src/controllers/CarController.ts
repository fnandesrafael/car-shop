import { Request, Response } from 'express';
import CarService from '../services/CarService';
import { ICar } from '../interfaces/ICar';

class CarController {
  private _service: CarService;

  constructor() {
    this._service = new CarService();
  }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const response = await this._service.create(req.body);

    return res.status(200).json(response);
  }
}

export default CarController;