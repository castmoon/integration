import { IAxiosRequest } from '../../main/config/Axios';
import { IService } from '../protocols';

export class GetOportunityService implements IService {
  constructor(private readonly request: IAxiosRequest) {}
  async execute(): Promise<any> {
    const response = await this.request.send();
    if (response.data === null) return null;
    return response;
  }
}
