import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import Account from '../models/Account';

const getAccounts = async (req: Request, res: Response) => {
  try {
    const { accountNumber } = req.query;

    const accounts = accountNumber
      ? await Account.findOne({ accountNumber })
      : await Account.find();

    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
};

const createAccount = async (req: Request, res: Response) => {
  try {
    const account = new Account({ accountNumber: uuid() });
    await account.save();

    return res.status(200).json({
      message: 'Account created successfully!',
      account,
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).send(`Error creating a new account: ${error}`);
  }
};

export { getAccounts, createAccount };
