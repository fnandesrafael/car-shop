import { ICar } from "../../interfaces/ICar"

const carMock: ICar = {
  model: 'Punto',
  year: 2018,
  color: 'Preto',
  buyValue: 40000,
  doorsQty: 4,
  seatsQty: 5
}

const carMockWithId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: 'Punto',
  year: 2018,
  color: 'Preto',
  buyValue: 40000,
  doorsQty: 4,
  seatsQty: 5
}

export {
  carMock,
  carMockWithId
}