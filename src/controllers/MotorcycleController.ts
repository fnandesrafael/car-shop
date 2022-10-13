import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MotorcycleService from '../services/MotorcycleService';

class MotorcycleController {
  private _motorcycleService: MotorcycleService;

  constructor() {
    this._motorcycleService = new MotorcycleService();
  }

  get motorcycleService() { return this._motorcycleService; }

  public async create(req: Request & { body: IMotorcycle }, res: Response) {
    const response = await this.motorcycleService.create(req.body);

    return res.status(201).json(response);
  }

  public async read(req: Request, res: Response) {
    const response = await this.motorcycleService.read();

    return res.status(200).json(response);
  }
}

export default MotorcycleController;