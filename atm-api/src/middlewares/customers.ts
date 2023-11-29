import { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';
import { getCustomerBySessionToken } from '../models/Customer';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = req.cookies['ATM-AUTHENTICATION-API'];
    if (!sessionToken) {
      return res.status(403).json({
        message: 'Incorrect session token or unauthorized!',
      });
    }

    const existingCustomer = await getCustomerBySessionToken(sessionToken);
    if (!existingCustomer) {
      return res.status(403).json({
        message: 'Unauthorized!',
      });
    }

    merge(req, { identity: existingCustomer }); //merge with request object existingCustomer

    return next();
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const currentCustomerId = get(req, 'identity._id') as string | undefined;
    if (!currentCustomerId) {
      return res.status(403).json({
        message: 'Unauthorized!',
      });
    }
    if (currentCustomerId != id) {
      return res.status(403).json({
        message: 'Unauthorized!',
      });
    }

    next();
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};
