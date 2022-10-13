import { expect } from "chai";
import { Request, Response } from "express";
import sinon, { SinonStub } from 'sinon'
import MotorcycleController from "../../../controllers/MotorcycleController";
import { allMotorcyclesMockWithId, motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMocks";

const motorcycleController = new MotorcycleController()

describe('Testa a camada MotorcycleController', () => {
  const req = {} as Request
  const res = {} as Response
  
  before(() => {
    sinon.stub(motorcycleController.motorcycleService, 'create').resolves(motorcycleMockWithId)
    sinon.stub(motorcycleController.motorcycleService, 'read')
      .onCall(0 && 1).resolves(allMotorcyclesMockWithId)
      .onCall(2).resolves([])
    
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

  describe.only('quando forem listadas todas as motos cadastradas', () => { 
    it('com sucesso, e há motos cadastradas, é retornado um status 200', async () => {
      await motorcycleController.read(req, res)

      expect((res.status as SinonStub).calledWith(200)).to.be.true
    });

    it('com sucesso, e há motos cadastradas, é retornado um body com todos os documentos', async () => {
      await motorcycleController.read(req, res)

      expect((res.json as SinonStub).calledWith(allMotorcyclesMockWithId)).to.be.true
    });

    it('com sucesso, mas não há nenhuma moto cadastrada, é tornado um body com um array vazio', async () => {
      await motorcycleController.read(req, res)
      
      expect((res.status as SinonStub).calledWith([])).to.be.true
    });
  })
});