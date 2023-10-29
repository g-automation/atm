import { Response } from 'express';
import Account from '../models/Account';

const withdraw = async (
  req: { query: { accountNumber: string; amount: number } },
  res: Response,
) => {
  try {
    const { accountNumber, amount } = req.query;

    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(400).send('Account not found');

    if (account.balance < amount)
      return res.status(400).send('Insufficient balance');

    let amountRemaining = amount;
    let banknotes = { '100': 0, '50': 0, '20': 0, '10': 0 };

    [100, 50, 20, 10].forEach(note => {
      while (amountRemaining >= note) {
        amountRemaining -= note;
        banknotes[note as unknown as keyof typeof banknotes]++;
      }
    });

    if (amountRemaining > 0)
      return res
        .status(400)
        .send(
          'The requested amount cannot be withdrawn with the available banknotes',
        );

    account.balance -= amount;
    await account.save();

    return res.status(200).json({
      message: 'Withdrawal successful!',
      banknotes: banknotes,
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
};

export { withdraw };
