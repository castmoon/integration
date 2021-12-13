import { Collection } from 'mongodb';

/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { IAddRegisterRepository } from '../../../../data/protocols/db/register/add-register-repository';
import { IFindRegisterRepository } from '../../../../data/protocols/db/register/find-register-repository';
import { IRegisterModel } from '../../../../domain/models/register';
import { IAddRegisterModel } from '../../../../domain/usecases/add-register';
import { MongoHelper } from '../../helpers/mongo-helper';
import { Register } from '../../models/Register';

export class RegisterMongoRepository
  implements IAddRegisterRepository, IFindRegisterRepository
{
  async add(register: IAddRegisterModel): Promise<IRegisterModel> {
    const schema = new Register(register);
    const createdRegister = await schema.save();
    return MongoHelper.map(createdRegister);
  }

  async find(): Promise<IRegisterModel[]> {
    const registers = await Register.find();

    return MongoHelper.mapCollection(registers);
  }
}
