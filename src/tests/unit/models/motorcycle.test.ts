import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai'
import { allMotorcyclesMockWithId, motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMocks';
import Motorcycle from '../../../models/Motorcycle';

const motorcycleModel = new Motorcycle()

describe('Testa a model Motorcycle', () => {
  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId)
    sinon.stub(Model, 'find')
      .onCall(0).resolves(allMotorcyclesMockWithId)
      .onCall(1).resolves([])
  })

  after(() => {
    sinon.stub()
  })

  describe('quando é criado uma nova moto', async () => {
    it('com sucesso, é retornado o documento criado', async () => {
      const sut = await motorcycleModel.create(motorcycleMock)

      expect(sut).to.be.equal(motorcycleMockWithId)
    });
  });

  describe('quando forem listadas todas as motos cadastradas', () => {
    it('com sucesso, e há motos cadastradas, é retornado um array com os documentos', async () => {
      const sut = await motorcycleModel.read()

      expect(sut).to.be.an('array')
    })

    it('com sucesso, mas não há nenhuma moto cadastrada, é tornado um array vazio', async () => {
      const sut = await motorcycleModel.read()

      expect(sut).to.be.an('array')
      expect(sut).to.be.empty
    })
  });
});