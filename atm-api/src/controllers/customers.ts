import { Request, Response } from 'express';
import {
  deleteCustomerById,
  getCustomerByEmail,
  getCustomerById,
  getCustomers,
} from '../models/Customer';

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const customer = await getCustomerByEmail(email);

    return res.status(200).json(customer);

  } catch (error) {
    console.error(error);
    return res.status(500).send(`${error}`);
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomers();

    return res.status(200).json({
      customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`${error}`);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerById(id);

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found!',
      });
    }

    const { name, email, phone } = req.body;
    if (name !== undefined) {
      customer.name = name;
    }

    if (email !== undefined) {
      customer.email = email;
    }

    if (phone !== undefined) {
      customer.phone = phone;
    }

    await customer.save();

    return res.status(200).json({
      customer,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send(`${error}`);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteCustomerById(id);

    return res.status(200).json({
      message: 'Deleted!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`${error}`);
  }
};
