/* eslint-disable max-classes-per-file */
import { IRegisterModel } from '../../../domain/models/register';
import { IAddOrder } from '../../../domain/usecases/add-order';
import {
  IAddRegister,
  IAddRegisterModel,
} from '../../../domain/usecases/add-register';
import { CreateRegisterController } from '../../../presentation/controllers/Create-register-controller';
import { NotFoundError } from '../../../presentation/errors';
import {
  badRequest,
  serverError,
} from '../../../presentation/helpers/http/http-helper';
import { IController } from '../../../presentation/protocols/Controller';
import { IService } from '../../../presentation/protocols/Service';

const makeGetOportunity = (): IService => {
  class GetOportunityServiceStub implements IService {
    async execute(): Promise<any> {
      return {
        data: [
          {
            user_id: 1,
            owner_name: 'any_name',
            value: 100,
            currency: 'BRL',
          },
        ],
      };
    }
  }

  return new GetOportunityServiceStub();
};

const makeAddOrder = (): IAddOrder => {
  class AddOrderStub implements IAddOrder {
    async execute(): Promise<boolean> {
      return true;
    }
  }

  return new AddOrderStub();
};

const makeFakeRegister = (): IRegisterModel => ({
  id: 'valid_id',
  owner_name: 'valid_name',
  user_id: 123,
  value: 100,
  currency: 'BRL',
  deal_date: new Date(),
});

const makeAddRegister = (): IAddRegister => {
  class AddRegisterStub implements IAddRegister {
    async add(register: IAddRegisterModel): Promise<IRegisterModel> {
      return new Promise((resolve) => resolve(makeFakeRegister()));
    }
  }

  return new AddRegisterStub();
};

interface ISutTypes {
  sut: IController;
  getOportunityStub: IService;
  addRegisterStub: IAddRegister;
  addOrderStub: IAddOrder;
}

const makeSut = (): ISutTypes => {
  const getOportunityStub = makeGetOportunity();
  const addRegisterStub = makeAddRegister();
  const addOrderStub = makeAddOrder();
  const sut = new CreateRegisterController(
    getOportunityStub,
    addOrderStub,
    addRegisterStub
  );
  return {
    sut,
    getOportunityStub,
    addRegisterStub,
    addOrderStub,
  };
};

describe('Oportunity Controller', () => {
  test('should call GetOportunityService correctly', async () => {
    const { sut, getOportunityStub } = makeSut();
    const getOportunitySpy = jest.spyOn(getOportunityStub, 'execute');
    await sut.handle();
    expect(getOportunitySpy).toHaveBeenCalled();
  });

  test('should return an error if GetOportunityService returns null', async () => {
    const { sut, getOportunityStub } = makeSut();
    jest.spyOn(getOportunityStub, 'execute').mockReturnValueOnce(null);
    const error = await sut.handle();
    expect(error).toEqual(badRequest(new NotFoundError('oportunities')));
  });

  test('should return 500 if handle throws', async () => {
    const { sut, getOportunityStub } = makeSut();
    jest
      .spyOn(getOportunityStub, 'execute')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError());
  });
});
