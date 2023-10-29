import axios from 'axios';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/';

export const createAccount = async () => {
  try {
    const ENDPOINT = `accounts/create`;
    const response = await axios.post(`${API_URL}${ENDPOINT}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAccounts = async (accountNumber?: string) => {
  try {
    const ENDPOINT = `accounts${
      accountNumber ? `/accountNumber=${accountNumber}` : ''
    }`;
    const response = await axios.get(`${API_URL}${ENDPOINT}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const withdraw = async ({
  accountNumber,
  amount,
}: {
  accountNumber: string;
  amount: number;
}) => {
  try {
    const ENDPOINT = `atm/withdraw?accountNumber=${accountNumber}&amount=${amount}`;
    const response = await axios.put(`${API_URL}${ENDPOINT}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
