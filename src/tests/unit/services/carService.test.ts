import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMocks';
import { Model } from 'mongoose';
import { ICar } from '../../../interfaces/ICar';
const { expect } = chai;

describe('Testa a service CarService', () => {

  before(async () => {
    sinon
      .stub(Model, 'create').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando é criado um novo Car', () => {
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
    })
  })
});