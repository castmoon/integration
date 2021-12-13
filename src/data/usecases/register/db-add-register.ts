import { IRegisterModel } from '../../../domain/models/register';
import {
  IAddRegister,
  IAddRegisterModel,
} from '../../../domain/usecases/add-register';
import { IAddRegisterRepository } from '../../protocols/db/register/add-register-repository';

export class DbAddRegister implements IAddRegister {
  constructor(private readonly addRegisterRepository: IAddRegisterRepository) {}
  async add(register: IAddRegisterModel): Promise<IRegisterModel> {
    const createRegister = await this.addRegisterRepository.add(register);
    return createRegister;
  }
}
