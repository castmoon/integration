import { IAddOrder } from '../../domain/usecases/add-order';
import { IAddRegister } from '../../domain/usecases/add-register';
import { makeCreateOrder } from '../../main/factories/oportunity-info';
import { NotFoundError } from '../errors';
import { badRequest, ok, serverError } from '../helpers/http/http-helper';
import { IController, IService } from '../protocols';
import { IHttpResponse } from '../protocols/Http';

export class CreateRegisterController implements IController {
  constructor(
    private readonly getOportunity: IService,
    private readonly createOrder: IAddOrder,
    private readonly addRegister: IAddRegister
  ) {}
  async handle(): Promise<IHttpResponse> {
    try {
      const oportunities: any = await this.getOportunity.execute();
      if (oportunities === null) {
        return badRequest(new NotFoundError('oportunities'));
      }
      // bling mock
      const createOrder = await this.createOrder.execute(oportunities);
      if (!createOrder) {
        return badRequest(new NotFoundError('order'));
      }
      const userInfos = makeCreateOrder(oportunities.data);
      const register = await this.addRegister.add(userInfos);
      return ok(register);
    } catch (e) {
      return serverError();
    }
  }
}
