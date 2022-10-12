import { model as createMongoModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongoSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
  status: Boolean,
}, { versionKey: false });

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(model = createMongoModel('Motorcycle', motorcycleMongoSchema)) {
    super(model);
  }
}

export default Motorcycle;