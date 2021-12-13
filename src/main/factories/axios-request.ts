import { AxiosRequestConfig } from 'axios';

export const makeOportunityRequest = (url: string): AxiosRequestConfig => ({
  baseURL: url,
  method: 'get',
  responseType: 'json',
});
