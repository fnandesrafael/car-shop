import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarService';
import { allCarsMockWithId, carMock, carMockWithId } from '../../mocks/carMocks';
import { Model } from 'mongoose';
import { ICar } from '../../../interfaces/ICar';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Testa a service CarService', () => {
  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    sinon.stub(Model, 'find').resolves(allCarsMockWithId)
    sinon.stub(Model, 'findById').resolves(carMockWithId)
  });

  afterEach(() => {
    sinon.restore();
  })

  describe('ao criar um novo carro', () => {
    it('com sucesso, é retornado o documento criado', async () => {
      const sut = await new CarService().create(carMock)

      expect(sut).to.be.deep.equal(carMockWithId)
      expect(sut).to.include.keys('_id')
    });

    it('sem sucesso, por ser um objeto vazio, é disparado o erro "EmptyBody"', async () => {
      try {
        await new CarService().create({} as ICar)
      } catch(err: any) {

        expect(err.message).to.be.equal('EmptyBody')
      }
    });

    it('sem sucesso, por possuir atributos com tipos incorretos, é disparado um ZodError', async () => {
      try {
        await new CarService().create({...carMock, year: "2018"} as any)
      } catch(err: any) {
        const zodErrorMsg = err.issues[0].message

        expect(zodErrorMsg).to.be.equal('Invalid year type was provided')
      }
    });
  })

  describe('ao pesquisar todos os carros', () => {
    it('com sucesso, é retornado um array com todos os carros', async () => {
      const sut = await new CarService().read()

      expect(sut).to.be.deep.equal(allCarsMockWithId)
    });
  })

  describe('ao pesquisar um carro específico', () => {
    it('com sucesso, e o documento existe é retornado o mesmo', async () => {
      const sut = await new CarService().readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.deep.equal(carMockWithId)
    });

    it('com sucesso, mas o documento é nulo, é disparado um erro "DocumentNotFound"', async () => {
      try {
        await new CarService().readOne('4edd40c86762e0fb12000004')
      } catch(err) {
        expect(err).to.be.equal(ErrorTypes.DocumentNotFound)
      }
    });
  })
});