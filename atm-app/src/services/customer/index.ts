import { Customer } from '../../types/customers';
import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/';

export const getCustomer = async (email: string): Promise<AxiosResponse<Customer>> => {
  try {
    const ENDPOINT = `customers/${email}`;
    const response = await axios.get(`${API_URL}${ENDPOINT}`);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

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

export const updateCustomer = async (id: string, body: {
  name: string;
  email: string;
  phone: string;
}): Promise<AxiosResponse<Customer>> => {
  try {
    const ENDPOINT = `customers/${id}`;
    const response = await axios.put(`${API_URL}${ENDPOINT}`, body);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const deleteCustomer = async (id: string): Promise<AxiosResponse<Customer>> => {
  try {
    const ENDPOINT = `customers/${id}`;
    const response = await axios.delete(`${API_URL}${ENDPOINT}`);

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
}): Promise<AxiosResponse<Customer>> => {
  try {
    const ENDPOINT = `authentication/register`;
    const response = await axios.post(`${API_URL}${ENDPOINT}`, body);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const login = async (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse<Customer>> => {
  try {
    const ENDPOINT = `authentication/login`;
    const response = await axios.post(`${API_URL}${ENDPOINT}`, body);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const ENDPOINT = `authentication/logout`;
    const response = await axios.post(`${API_URL}${ENDPOINT}`);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};
