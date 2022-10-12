import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarService';
import { allCarsMockWithId, carMock, carMockWithId } from '../../mocks/carMocks';
import { Model } from 'mongoose';
import { ICar } from '../../../interfaces/ICar';
import { ZodError } from 'zod';
import ErrorCode from '../../../errors/ErrorCode';

const { expect } = chai;

const carService = new CarService()

describe('Testa a service CarService', () => {
  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    sinon.stub(Model, 'find').resolves(allCarsMockWithId)
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
  });

  after(() => {
    sinon.restore();
  })

  describe('ao criar um novo carro', () => {
    it('com sucesso, é retornado o documento criado', async () => {
      const sut = await carService.create(carMock)

      expect(sut).to.be.deep.equal(carMockWithId)
      expect(sut).to.include.keys('_id')
    });

    it('sem sucesso, por ser um objeto vazio, é disparado um ErrorCode', async () => {
      try {
        await carService.create({} as ICar)
      } catch(err: any) {

        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });

    it('sem sucesso, por possuir uma formatação de objeto incorreta, é disparado um ZodError', async () => {
      try {
        await new CarService().create({...carMock, year: "2018"} as any)
      } catch(err: any) {

        expect(err).to.be.an.instanceOf(ZodError)
      }
    });
  })

  describe('ao pesquisar todos os carros', () => {
    it('com sucesso, é retornado um array com todos os carros', async () => {
      const sut = await carService.read()

      expect(sut).to.be.deep.equal(allCarsMockWithId)
    });
  })

  describe('ao pesquisar um carro específico', () => {
    it('com sucesso, e o documento existe é retornado o mesmo', async () => {
      const sut = await carService.readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.deep.equal(carMockWithId)
    });

    it('com sucesso, mas o documento é nulo, é disparado um ErrorCode', async () => {
      try {
        await carService.readOne('4edd40c86762e0fb12000004')
      } catch(err: any) {

        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });
  })
});