import { isValidObjectId } from 'mongoose';
import errorCatalog from '../errors/errorCatalog';
import ErrorCode from '../errors/ErrorCode';
import { carSchema, ICar } from '../interfaces/ICar';
import Car from '../models/Car';

const {
  EmptyBody,
  InvalidMongoId,
  DocumentNotFound,
} = errorCatalog;

class CarService {
  private _carModel: Car;

  constructor() {
    this._carModel = new Car();
  }

  public async create(obj: ICar): Promise<ICar> {
    if (Object.keys(obj).length === 0) throw new ErrorCode(EmptyBody.message, EmptyBody.statusCode);
    
    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) { throw parsed.error; }

    return this._carModel.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) {
      throw new ErrorCode(InvalidMongoId.message, InvalidMongoId.statusCode);
    }
    
    const car = await this._carModel.readOne(_id);

    if (car === null) {
      throw new ErrorCode(DocumentNotFound.message, DocumentNotFound.statusCode);
    } return car;
  }
}

export default CarService;