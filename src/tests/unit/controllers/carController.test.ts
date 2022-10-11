import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMocks';
import CarController from '../../../controllers/CarController';
const { expect } = chai;

const carController = new CarController()

describe('Testa o controller CarController', () => {  
  const req = {} as Request
  const res = {} as Response

  before(async () => {
    sinon
      .stub(carController._service, 'create').resolves(carMockWithId)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  })

  after(() => {
    sinon.restore()
  })

  describe('quando é criado um novo Car', () => {
    it('com sucesso, é retornado um status 201 com o objeto criado', async () => {
      req.body = carMock
      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  })
});