import { expect } from "chai";
import { Request, Response } from "express";
import sinon, { SinonStub } from 'sinon'
import MotorcycleController from "../../../controllers/MotorcycleController";
import { motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMocks";

const motorcycleController = new MotorcycleController()

describe('Testa a camada MotorcycleController', () => {
  const req = {} as Request
  const res = {} as Response
  
  before(() => {
    sinon.stub(motorcycleController.motorcycleService, 'create').resolves(motorcycleMockWithId)
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  })

  after(() => {
    sinon.restore
  })
  
  describe('ao criar uma nova moto', () => {
    it('com sucesso, é retornado um status 201', async () => {
      req.body = motorcycleMock
      await motorcycleController.create(req, res)

      expect((res.status as SinonStub).calledWith(201)).to.be.true
    });

    it('com sucesso, é retornado no corpo da requisição, o documento criado', async () => {
      req.body = motorcycleMock
      await motorcycleController.create(req, res)

      expect((res.json as SinonStub).calledWith(motorcycleMockWithId)).to.be.true
    });
  });
});