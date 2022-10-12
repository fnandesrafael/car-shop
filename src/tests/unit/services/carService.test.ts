import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarService';
import { allCarsMockWithId, carMock, carMockForUpdate, carMockForUpdateWithId, carMockWithId } from '../../mocks/carMocks';
import { ICar } from '../../../interfaces/ICar';
import { ZodError } from 'zod';
import ErrorCode from '../../../errors/ErrorCode';

const { expect } = chai;

const carService = new CarService()

describe('Testa a service CarService', () => {
  before(() => {
    sinon.stub(carService._carModel, 'create').resolves(carMockWithId)
    sinon.stub(carService._carModel, 'read').resolves(allCarsMockWithId)
    sinon.stub(carService._carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
    sinon.stub(carService._carModel, 'update')
      .onCall(0).resolves(carMockForUpdateWithId)
      .onCall(1 && 2).resolves(null)
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

    it('sem sucesso, por possuir um id inválido, é disparado um ErrorCode', async () => {
      try {
        await carService.readOne('123ERRADO')
      } catch(err) {
        
        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });
  })

  describe('ao atualizar os dados de um carro', () => {
    it('com sucesso, e o documento existe, é retornado o documento atualizado', async () => {
      const sut = await carService.update('4edd40c86762e0fb12000004', carMockForUpdate)

      expect(sut).to.be.equal(carMockForUpdateWithId)
    });

    it('com sucesso, mas o documento é nulo, é disparado um ErrorCode', async () => {
      try {
        await carService.update('4edd40c86762e0fb12000007', carMockForUpdate)
      } catch(err: any) {
        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });

    it('sem sucesso, por possuir um id inválido, é disparado um ErrorCode', async () => {
      try {
        await carService.update('4edd40c86762e0fb12000007', carMockForUpdate)
      } catch(err: any) {
        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });

    it('sem sucesso, por possuir uma formatação inválida, é disparado um ZodError', async () => {
      try {
        await carService.update('4edd40c86762e0fb12000007', {...carMockForUpdate, year: "2020"} as any)
      } catch(err: any) {
        expect(err).to.be.an.instanceOf(ZodError)
      }
    });

    it('sem sucesso, por possuir um body vazio, é disparado um ErrorCode', async () => {
      try {
        await carService.update('4edd40c86762e0fb12000007', {} as any)
      } catch(err: any) {
        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });
  })
});