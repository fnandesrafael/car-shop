import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarService from '../../../services/CarService';
import { allCarsMockWithId, carMock, carMockWithId } from '../../mocks/carMocks';
import CarController from '../../../controllers/CarController';
const { expect } = chai;

const carController = new CarController()

describe('Testa o controller CarController', () => {  
  const req = {} as Request
  const res = {} as Response

  before(async () => {
    sinon
      .stub(carController._service, 'create').resolves(carMockWithId)
    sinon
      .stub(carController._service, 'read').resolves(allCarsMockWithId)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  })

  after(() => {
    sinon.restore()
  })

  describe('ao criar um novo carro', () => {
    it('com sucesso, é retornado um status 201 com o objeto criado', async () => {
      req.body = carMock
      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('ao pesquisar todos os carros', () => {
    it('com sucesso, é retornado um status 200', async () => {
      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCarsMockWithId)).to.be.true
    })
  })
});