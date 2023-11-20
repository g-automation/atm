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
    const account = new Account({
      accountNumber: uuid(),
    });
    await account.save();

    return res.status(200).json({
      message: 'Account created successfully!',
      account,
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).send(`Internal server error creating a new account: ${error}`);
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  try {
    await Account.findByIdAndDelete({ '_id': req.params.id })

    return res.status(200).json({
      message: `Account number: deleted successfully!`,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send(`Internal server error deleting account: ${error}`);
  }
};

const deleteAllAccounts = async (req: Request, res: Response) => {
  try {
    await Account.deleteMany({});
    return res.status(200).send(`Accounts deleted successfully`);
  } catch (error) {
    return res.status(500).send(`Internal server error deleting all accounts: ${error}`);
  }
};

export { getAccounts, createAccount, deleteAccount, deleteAllAccounts };