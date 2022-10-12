import { Request, Response } from 'express';
import CarService from '../services/CarService';
import { ICar } from '../interfaces/ICar';

class CarController {
  private _service: CarService;

  constructor() {
    this._service = new CarService();
  }

  get service() { return this._service; }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const response = await this.service.create(req.body);

    return res.status(201).json(response);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const response = await this.service.read();

    return res.status(200).json(response);
  }

  public async readOne(req: Request & { body: ICar }, res: Response<ICar>) {
    const { id } = req.params;

    const response = await this.service.readOne(id);

    return res.status(200).json(response);
  }

  public async update(req: Request & { body: ICar }, res:Response<ICar>) {
    const { id } = req.params;
    const { body } = req;

    const response = await this.service.update(id, body);

    return res.status(200).json(response);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    
    await this.service.delete(id);

    return res.status(204).json();
  }
}

export default CarController;