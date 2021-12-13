import { IRegisterModel } from '../models/register';

export interface IAddRegisterModel {
  user_id: number;
  owner_name: string;
  value: number;
  currency: string;
  deal_date: Date;
}

export interface IAddRegister {
  add(register: IAddRegisterModel): Promise<IRegisterModel>;
}
