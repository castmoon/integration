/* eslint-disable max-classes-per-file */
/* eslint-disable no-new */
import { IAddRegisterRepository } from '../../../data/protocols/db/register/add-register-repository';
import { DbAddRegister } from '../../../data/usecases/register/db-add-register';
import { IRegisterModel } from '../../../domain/models/register';
import {
  IAddRegister,
  IAddRegisterModel,
} from '../../../domain/usecases/add-register';

const makeFakeRepository = (): IAddRegisterRepository => {
  class AddRegisterRepositoryStub implements IAddRegisterRepository {
    add(register: IAddRegisterModel): Promise<IRegisterModel> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          ...register,
        })
      );
    }
  }
  return new AddRegisterRepositoryStub();
};

interface ISutTypes {
  sut: IAddRegister;
  addRegisterStub: IAddRegisterRepository;
}
const makeSut = (): ISutTypes => {
  const addRegisterStub = makeFakeRepository();
  const sut = new DbAddRegister(addRegisterStub);
  return {
    sut,
    addRegisterStub,
  };
};

const makeFakeRegister = (): IAddRegisterModel => ({
  user_id: 123,
  value: 123,
  owner_name: 'any_owner_name',
  deal_date: new Date(),
  currency: 'USD',
});

describe('Add Register', () => {
  test('should call Add Register Repository with correct values', async () => {
    const { sut, addRegisterStub } = makeSut();
    const fakeRegister = makeFakeRegister();
    const addRegisterSpy = jest.spyOn(addRegisterStub, 'add');
    await sut.add(fakeRegister);
    expect(addRegisterSpy).toHaveBeenCalledWith(fakeRegister);
  });

  test('should return an register if success', async () => {
    const { sut } = makeSut();
    const fakeRegister = makeFakeRegister();
    const response = await sut.add(fakeRegister);
    expect(response).toEqual({
      id: 'any_id',
      ...fakeRegister,
    });
  });
});
