import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock: IMotorcycle = {
  model: 'Hornet',
  color: 'Vermelha',
  year: 2017,
  buyValue: 70000,
  category: 'Street',
  engineCapacity: 2000
}

const motorcycleMockWithId: IMotorcycle & {_id: string} = {
  _id: '4edd40c86762e0fb12000003',
  model: 'Hornet',
  color: 'Vermelha',
  year: 2017,
  buyValue: 70000,
  category: 'Street',
  engineCapacity: 2000
}

export {
  motorcycleMock,
  motorcycleMockWithId
}