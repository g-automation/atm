import axios from 'axios';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/';

export const getAllCustomers = async () => {
  try {
    const ENDPOINT = `customers`;
    const response = await axios.get(`${API_URL}${ENDPOINT}`);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const register = async (body: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const ENDPOINT = `auth/register`;
    const response = await axios.post(`${API_URL}${ENDPOINT}`, body);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};
