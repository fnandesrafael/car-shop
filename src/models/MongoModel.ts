import { Model, isValidObjectId, UpdateQuery } from 'mongoose';
import errorCatalog from '../errors/errorCatalog';
import { IModel } from '../interfaces/IModel';
import ErrorCode from '../errors/ErrorCode';

const {
  InvalidMongoId,
} = errorCatalog;

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    return this._model.findById({ _id });
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new ErrorCode(InvalidMongoId.message, InvalidMongoId.statusCode);
    }

    return this._model.findByIdAndRemove(_id);
  }
}

export default MongoModel;