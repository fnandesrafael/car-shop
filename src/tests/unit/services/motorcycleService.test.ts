import { expect } from "chai";
import * as sinon from "sinon";
import { ZodError } from "zod";
import ErrorCode from "../../../errors/ErrorCode";
import MotorcycleService from "../../../services/MotorcycleService";
import { allMotorcyclesMockWithId, motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMocks";

const motorcycleService = new MotorcycleService()

describe('Testa a service MotorcycleService', () => {
  before(() => {
    sinon.stub(motorcycleService.motorcycleModel, 'create').resolves(motorcycleMockWithId)
    sinon.stub(motorcycleService.motorcycleModel, 'read')
      .onCall(0).resolves(allMotorcyclesMockWithId)
      .onCall(1).resolves([])
    sinon.stub(motorcycleService.motorcycleModel, 'readOne').resolves(motorcycleMockWithId)
  })

  after(() => {
    sinon.restore()
  })

  describe('quando é criada uma nova moto', () => { 
    it('com sucesso, é retornado o documento criado', async () => {
      const sut = await motorcycleService.create(motorcycleMock)

      expect(sut).to.be.equal(motorcycleMockWithId)
    });

    it('sem sucesso, pois a formatação do body é incorreta, é lançado um ZodError', async () => {
      try {
        await motorcycleService.create({...motorcycleMock, year: '2017'} as any)
      } catch(err) {
        
        expect(err).to.be.an.instanceOf(ZodError)
      }
    });

    it('sem sucesso, pois o body é vazio, é lançado um ErrorCode', async () => {
      try {
        await motorcycleService.create({} as any)
      } catch(err) {

        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });
  });

  describe('quando forem listadas todas as motos cadastradas', () => {
    it('com sucesso, e há motos cadastradas, é retornado um array com os documentos', async () => {
      const sut = await motorcycleService.read();

      expect(sut).to.be.an('array')
      expect(sut).to.not.be.empty
    })

    it('com sucesso, mas não há nenhuma moto cadastrada, é tornado um array vazio', async () => {
      const sut = await motorcycleService.read();

      expect(sut).to.be.an('array')
      expect(sut).to.be.empty
    })
  });

  describe('quando é pesquisado uma moto específica', () => {
    it('com sucesso, e a moto está cadastrada no banco, é retornado o documento pesquisado', async () => {
      const sut = await motorcycleService.readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.equal(motorcycleMockWithId)
    });

    it('com sucesso, mas a moto não está cadastrada no banco, é disparado um ErrorCode', async () => {
      try {
        await motorcycleService.readOne('4edd40c86762e0fb12000005')
      } catch(err) {
        
        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });

    it('sem sucesso, pois o id passado não possui um formado válido, é disparado um ErrorCode', async () => {
      try {
        await motorcycleService.readOne('4edd40c86762e0fb12000003')
      } catch(err) {

        expect(err).to.be.an.instanceOf(ErrorCode)
      }
    });
  })
})