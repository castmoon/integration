import { DbFindRegister } from '../../../data/usecases/register/db-find-register';
import { RegisterMongoRepository } from '../../../infra/db/mongodb/register/register-mongo-repository';
import { FindRegisterController } from '../../../presentation/controllers/Find-register-controller';
import { IController } from '../../../presentation/protocols';
import { cache } from '../../server';

export const makeFindRegisterController = (): IController => {
  const registerMongoRepository = new RegisterMongoRepository();
  const dbFindRegister = new DbFindRegister(registerMongoRepository);

  const findRegisterController = new FindRegisterController(
    dbFindRegister,
    cache
  );

  return findRegisterController;
};
