import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai'
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMocks';
import Motorcycle from '../../../models/Motorcycle';

const motorcycleModel = new Motorcycle()

describe('Testa a model Motorcycle', () => {
  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId)
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
});