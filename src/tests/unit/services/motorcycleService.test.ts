import { expect } from "chai";
import * as sinon from "sinon";
import { ZodError } from "zod";
import ErrorCode from "../../../errors/ErrorCode";
import { motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMocks";

const motorcycleService = new MotorCyleService()

describe('Testa a service MotorcycleService', () => {
  before(() => {
    sinon.stub(motorcycleService.motorcycleModel, 'create').resolves(motorcycleMockWithId)
  })

  after(() => {
    sinon.restore()
  })

  describe('quando é criada uma nova moto', () => { 
    it('com sucesso, é retornado o documento criado', async () => {
      const sut = motorcycleService.create(motorcycleMock)

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
})