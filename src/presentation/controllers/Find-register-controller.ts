import { ICache } from '../../data/protocols/cache';
import { IFindRegister } from '../../domain/usecases/find-register';
import { ok } from '../helpers/http/http-helper';
import { IController } from '../protocols';
import { IHttpResponse } from '../protocols/Http';

export class FindRegisterController implements IController {
  constructor(
    private readonly findRegister: IFindRegister,
    private readonly cache: ICache
  ) {}

  async handle(): Promise<IHttpResponse> {
    const cached = await this.cache.get('user');
    if (cached) return ok(cached);

    const registers = await this.findRegister.find();

    this.cache.set('user', registers as any);
    return ok(registers);
  }
}
