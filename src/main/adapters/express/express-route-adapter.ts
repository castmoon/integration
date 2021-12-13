/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';

import { IController } from '../../../presentation/protocols';

export const adaptRoute = (controller: IController) => {
  return async (_: Request, res: Response) => {
    const httpResponse = await controller.handle();
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
