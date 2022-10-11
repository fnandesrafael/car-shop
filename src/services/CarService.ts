import { ErrorTypes } from '../errors/catalog';
import { carSchema, ICar } from '../interfaces/ICar';
import Car from '../models/Car';

class CarService {
  private _carModel: Car;

  constructor() {
    this._carModel = new Car();
  }

  public async create(obj: ICar) {
    if (Object.keys(obj).length === 0) throw new Error(ErrorTypes.EmptyBody);
    
    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) { throw parsed.error; }

    return this._carModel.create(obj);
  }
}

export default CarService;