import { Router } from 'express';

import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeCreateRegisterController } from '../factories/register/create-register-factory';
import { makeFindRegisterController } from '../factories/register/find-register-factory';

export default (router: Router): void => {
  router.post('/registers', adaptRoute(makeCreateRegisterController()));
  router.get('/registers', adaptRoute(makeFindRegisterController()));
};
