import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMocks';
import Car from '../../../models/Car';
const { expect } = chai;

describe('Testa a model Car', () => {

  before(async () => {
    sinon
      .stub(Model, 'create').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('ao criar um novo carro', () => {
    it('com sucesso', async () => {
      const sut = await new Car().create(carMock)

      expect(sut).to.be.deep.equal(carMockWithId)
    });
  })
});