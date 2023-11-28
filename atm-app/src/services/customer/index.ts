import axios from 'axios';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/';

export const register = async ({
    name,
    email,
    phone,
    password,
}: {
    name: string;
    email: string;
    phone: string;
    password: string;

}) => {
    try {
        const ENDPOINT = `authentication/auth/register`;
        const response = await axios.post(`${API_URL}${ENDPOINT}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getAllCustomers = async () => {
    try {
        const ENDPOINT = `customers`;
        const response = await axios.get(`${URL}${ENDPOINT}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
