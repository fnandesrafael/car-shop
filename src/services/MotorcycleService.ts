import ErrorCode from '../errors/ErrorCode';
import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';
import Motorcycle from '../models/Motorcycle';
import errorCatalog from '../errors/errorCatalog';

const {
  EmptyBody,
} = errorCatalog;

class MotorcycleService {
  private _motorcycleModel: Motorcycle;

  constructor() {
    this._motorcycleModel = new Motorcycle();
  }

  get motorcycleModel() { return this._motorcycleModel; }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    if (Object.keys(obj).length === 0) {
      throw new ErrorCode(EmptyBody.message, EmptyBody.statusCode);
    }

    const parsed = motorcycleSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const motorcycle = await this.motorcycleModel.create(obj);

    return motorcycle;
  }

  public async read(): Promise<IMotorcycle[] | []> {
    const motorcycles = await this.motorcycleModel.read();

    return motorcycles;
  }
}

export default MotorcycleService;