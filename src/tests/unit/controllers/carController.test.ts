import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMocks';
import CarController from '../../../controllers/CarController';
const { expect } = chai;

describe('Testa o controller CarController', () => {  
  const req = {} as Request
  const res = {} as Response

  before(async () => {
    sinon
      .stub(new CarService(), 'create').resolves(carMockWithId);

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando é criado um novo Car', () => {
    it('com sucesso, é retornado um status 201', async () => {
      req.body = carMock
      await new CarController().create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

    // it('com sucesso, é retornado um body com o documento criado e seu _id', async () => {

    // });

    // it('sem sucesso, é retornado um status 400 ou 500', async () => {
      
    // });

    // it('sem sucesso, é retornado um objeto com a chave "message" e a respectiva mensagem de erro',
    // async () => {

    // })
  })
});