import axios, { AxiosRequestConfig } from 'axios';

import { IRequest } from '../../presentation/protocols';

interface IAxiosBody {
  data: any;
}

export interface IAxiosRequest extends IRequest {
  send(): Promise<IAxiosBody>;
}

export class AxiosRequest implements IRequest {
  constructor(private readonly config: AxiosRequestConfig) {}
  async send(): Promise<any> {
    const request = await axios(this.config);
    return request.data;
  }
}
