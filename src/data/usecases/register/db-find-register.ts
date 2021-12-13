import { IRegisterModel } from '../../../domain/models/register';
import { IFindRegister } from '../../../domain/usecases/find-register';
import { IFindRegisterRepository } from '../../protocols/db/register/find-register-repository';

export class DbFindRegister implements IFindRegister {
  constructor(
    private readonly findRegisterRepository: IFindRegisterRepository
  ) {}
  async find(): Promise<IRegisterModel[]> {
    const registers = await this.findRegisterRepository.find();
    return registers;
  }
}
