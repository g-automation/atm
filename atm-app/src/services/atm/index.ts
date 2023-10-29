import axios from 'axios';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/';

interface IWithdraw {
  accountNumber: string;
  amount: number;
}

export const withdraw = async ({ accountNumber, amount }: IWithdraw) => {
  try {
    const ENDPOINT = `atm/withdraw?accountNumber=${accountNumber}&amount=${amount}`;
    const response = await axios.put(`${API_URL}${ENDPOINT}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
