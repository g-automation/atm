import { Request, Response } from 'express';
import { createCustomer, getCustomerByEmail } from '../models/Customer';
import { random, authentication } from '../helpers/authentication';

//register customer
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = await req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Enter your full name, email and password!',
      });
    }

    const existingCustomer = await getCustomerByEmail(email);
    if (existingCustomer) {
      return res.status(400).json({
        message: 'Existing email!',
        existingCustomer,
      });
    }

    const salt = random();

    const customer = await createCustomer({
      name,
      email,
      phone,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};

//check login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Incorrect email or password!',
      });
    }

    const customer = await getCustomerByEmail(email).select(
      '+authentication.salt +authentication.password',
    );
    if (!customer) {
      return res.status(400).json({
        message: 'Incorrect email!',
        customer,
        email,
      });
    }

    //authentication, compare hashes
    const expectedHash = authentication(
      customer.authentication?.salt ?? '',
      password,
    );
    if (customer.authentication?.password !== expectedHash) {
      return res.status(403).json({
        message: 'No authorized!',
        expectedHash,
      });
    }

    const salt = random();
    customer.authentication.sessionToken = authentication(
      salt,
      customer._id.toString(),
    );

    await customer.save();

    res.cookie('ATM-AUTHENTICATION-API', customer.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json({
      message: 'Login successfully!',
      customer,
    });
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};
