import sinon, { SinonStub } from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import { allCarsMockWithId, carMock, carMockWithId } from '../../mocks/carMocks';
import CarController from '../../../controllers/CarController';
const { expect } = chai;

const carController = new CarController()

describe('Testa o controller CarController', () => {  
  const req = {} as Request
  const res = {} as Response
  
  beforeEach(() => {
    sinon.stub(carController._service, 'create').resolves(carMockWithId)
    sinon.stub(carController._service, 'read').resolves(allCarsMockWithId)
    sinon.stub(carController._service, 'readOne').resolves(carMockWithId)

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('ao criar um novo carro', () => {
    it('com sucesso, é retornado um status 201', async () => {
      req.body = carMock
      await carController.create(req, res)

      expect((res.status as SinonStub).calledWith(201)).to.be.true;
    });
    it('com sucesso, é retornado no body da requisição, o objeto criado', async () => {
      req.body = carMock
      await carController.create(req, res)

      expect((res.json as SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })

  describe('ao pesquisar todos os carros', () => {
    it('com sucesso, é retornado um status 200', async () => {
      await carController.read(req, res)

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(allCarsMockWithId)).to.be.true
    });
    it('com sucesso, é retornado no body da requisição, todos os carros do banco', async () => {
      await carController.read(req, res)

      expect((res.json as SinonStub).calledWith(allCarsMockWithId)).to.be.true
    });
  })

  describe('ao pesquisar um carro específico', () => {
    it('com sucesso, é retornado um status 200', async () => {
      req.params = { id: '4edd40c86762e0fb12000003' }
      await carController.readOne(req, res)

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
    });
    it('com sucesso, é retornado no body da requisição, o documento pesquisado', async () => {
      req.params = { id: '4edd40c86762e0fb12000003' }
      await carController.readOne(req, res)

      expect((res.json as SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })
});