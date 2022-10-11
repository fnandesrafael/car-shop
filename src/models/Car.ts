import { model as createMongoModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class Car extends MongoModel<ICar> {
  constructor(model = createMongoModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default Car;