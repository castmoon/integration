import { IRegisterModel } from '../models/register';

export interface IFindRegister {
  find(): Promise<IRegisterModel[]>;
}
