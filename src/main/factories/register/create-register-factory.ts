import { DbAddRegister } from '../../../data/usecases/register/db-add-register';
import { RegisterMongoRepository } from '../../../infra/db/mongodb/register/register-mongo-repository';
import { CreateRegisterController } from '../../../presentation/controllers/Create-register-controller';
import { IController } from '../../../presentation/protocols';
import { CreateOrderService } from '../../../presentation/services/Create-Order-service';
import { GetOportunityService } from '../../../presentation/services/Get-oportunity-service';
import { AxiosRequest } from '../../config/Axios';
import { makeOportunityRequest } from '../axios-request';

export const makeCreateRegisterController = (): IController => {
  const registerMongoRepository = new RegisterMongoRepository();
  const dbAddRegister = new DbAddRegister(registerMongoRepository);

  const request = new AxiosRequest(
    makeOportunityRequest(process.env.PIPEDRIVE_URL)
  );
  const getOportunityService = new GetOportunityService(request);
  const createOrderService = new CreateOrderService();

  const createRegisterController = new CreateRegisterController(
    getOportunityService,
    createOrderService,
    dbAddRegister
  );

  return createRegisterController;
};
