import { Request, Response } from 'express';
import {
  deleteCustomerById,
  getCustomerByEmail,
  getCustomerById,
  getCustomers,
} from '../models/Customer';

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const customer = await getCustomerByEmail(email);

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found!',
      });
    } else {
      return res.status(200).json({
        message: 'Customer found!',
        customer,
      });
    }
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomers();

    return res.status(200).json({
      message: 'All customers!',
      customers,
    });
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: 'Name, email and phone is required!',
        name,
      });
    }

    let customer = await getCustomerById(id);

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found!',
      });
    }

    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    await customer.save();

    return res
      .status(200)
      .json({
        message: 'Customer updated successfully!',
        customer,
      })
      .end();
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await deleteCustomerById(id);

    return res.status(200).json({
      message: 'Deleted!',
      deletedCustomer,
    });
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};
