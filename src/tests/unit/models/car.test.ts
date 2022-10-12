import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { allCarsMockWithId, carMock, carMockForUpdate, carMockForUpdateWithId, carMockWithId } from '../../mocks/carMocks';
import Car from '../../../models/Car';
const { expect } = chai;

const carModel = new Car()

describe('Testa a model Car', () => {
  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    sinon.stub(Model, 'find').resolves(allCarsMockWithId)
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
    sinon.stub(Model, 'findByIdAndUpdate')
      .onCall(0).resolves(carMockForUpdateWithId)
      .onCall(1).resolves(null)
    sinon.stub(Model, 'findByIdAndRemove')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
  });

  after(() => {
    sinon.restore();
  })

  describe('ao criar um novo carro', () => {
    it('com sucesso', async () => {
      const sut = await carModel.create(carMock)

      expect(sut).to.be.deep.equal(carMockWithId)
    });
  })

  describe('ao pesquisar todos os carros', () => {
    it('com sucesso', async () => {
      const sut = await carModel.read()

      expect(sut).to.be.deep.equal(allCarsMockWithId)
    })
  })

  describe('ao pesquisar um carro específico', () => {
    it('com sucesso, e o documento existe é retornado o mesmo', async () => {
      const sut = await carModel.readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.deep.equal(carMockWithId)
    });
    
    it('com sucesso, mas o documento não existe, é retornado nulo', async () => {
      const sut = await carModel.readOne('4edd40c86762e0fb12000004')

      expect(sut).to.be.deep.equal(null)
    });
  })

  describe('ao atualizar os dados de um carro', () => {
    it('com sucesso, e o documento existe, é retornado mesmo', async () => {
      const sut = await carModel.update('4edd40c86762e0fb12000004', carMockForUpdate)

      expect(sut).to.be.equal(carMockForUpdateWithId)
    })

    it('com sucesso, mas o documento não existe, é retornado null', async () => {
      const sut = await carModel.update('4edd40c86762e0fb12000004', carMockForUpdate)

      expect(sut).to.be.equal(null)
    })
  })

  describe('ao apagar um documento específico', () => {
    it('com sucesso, e o documento existe, é retornado o documento apagado', async () => {
      const sut = await carModel.delete('4edd40c86762e0fb12000003')

      expect(sut).to.be.equal(carMockWithId)
    });

    it('com sucesso, mas o documento não existe, é retornado nulo', async () => {
      const sut = await carModel.delete('4edd40c86762e0fb12000004')

      expect(sut).to.be.equal(null)
    });
  })
});