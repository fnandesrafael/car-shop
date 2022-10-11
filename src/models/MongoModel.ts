import { Model, isValidObjectId, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

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
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');

    return this._model.findById({ _id });
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');

    const documentExists = await this.readOne(_id);

    if (documentExists) {
      return this._model.findByIdAndUpdate(
        { _id },
        { ...obj } as UpdateQuery<T>,
        { new: true },
      );
    } throw new Error('DocumentNotFound');
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');

    const documentExists = await this.readOne(_id);

    if (documentExists) {
      return this._model.findByIdAndRemove(_id);
    } throw new Error('DocumentNotFound');
  }
}

export default MongoModel;