import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { allCarsMockWithId, carMock, carMockWithId } from '../../mocks/carMocks';
import Car from '../../../models/Car';
const { expect } = chai;

describe('Testa a model Car', () => {

  before(async () => {
    sinon
      .stub(Model, 'create').resolves(carMockWithId)
    sinon
      .stub(Model, 'find').resolves(allCarsMockWithId)
    sinon
      .stub(Model, 'findById')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves(null)
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

  describe('ao pesquisar todos os carros', () => {
    it('com sucesso', async () => {
      const sut = await new Car().read()

      expect(sut).to.be.deep.equal(allCarsMockWithId)
    })
  })

  describe('ao pesquisar um carro específico', () => {
    it('com sucesso, e o documento existe é retornado o mesmo', async () => {
      const sut = await new Car().readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.deep.equal(carMockWithId)
    })
    it('com sucesso, mas o documento não existe, é retornado nulo', async () => {
      const sut = await new Car().readOne('4edd40c86762e0fb12000004')

      expect(sut).to.be.deep.equal(null)
    })
  })
});