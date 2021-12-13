import { IFindRegister } from '../../domain/usecases/find-register';
import { ok } from '../helpers/http/http-helper';
import { IController } from '../protocols';
import { IHttpResponse } from '../protocols/Http';

export class FindRegisterController implements IController {
  constructor(private readonly findRegister: IFindRegister) {}

  async handle(): Promise<IHttpResponse> {
    const registers = await this.findRegister.find();
    return ok(registers);
  }
}
