import { IRegisterModel } from '../../../../domain/models/register';

export interface IFindRegisterRepository {
  find(): Promise<IRegisterModel[]>;
}
