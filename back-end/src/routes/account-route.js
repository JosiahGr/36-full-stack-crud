'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Account from '../models/account';
import basicAuthMiddleware from '../lib/basic-auth-middleware';
import logger from '../lib/logger';

const accountRouter = new Router();
const jsonParser = json();

accountRouter.post('/signup', jsonParser, (request, response, next) => {
  return Account.create(request.body.username, request.body.email, request.body.phoneNumber, request.body.password)
    .then((account) => {
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH - creating token');
      return account.pCreateToken();
    })
    .then((token) => {
      response.cookie('X-Auth-Token', token, { maxAge: 900000 });
      logger.log(logger.INFO, 'AUTH - return 200 code');
      response.send(token);
    })
    .catch(next);
});

accountRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'AUTH - Invalid request'));
  }
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'responding with 200 status and token');
      response.cookie('PPA-Token', token, { maxAge: 900000 });
      response.send(token);
    })
    .catch(next);
});

export default accountRouter;
