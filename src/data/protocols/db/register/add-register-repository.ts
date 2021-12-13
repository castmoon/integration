import { IRegisterModel } from '../../../../domain/models/register';
import { IAddRegisterModel } from '../../../../domain/usecases/add-register';

export interface IAddRegisterRepository {
  add(register: IAddRegisterModel): Promise<IRegisterModel>;
}
