import { Request, Response } from "express";
import { deleteCustomerById, getCustomerById, getCustomers } from "../models/Customer";

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await getCustomers();

        return res.status(200).json({
            message: 'All customers!',
            customers
        });

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
            deletedCustomer
        });
    } catch (error) {
        return res.status(400).send(`${error}`);
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'Name is required!',
                name
            });
        }

        let customer = await getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found!'
            });
        }

        customer.name = name;
        await customer.save();

        return res.status(200).json({
            message: 'Customer updated successfully!',
            customer,
        }).end();
    } catch (error) {
        return res.status(400).send(`${error}`);
    }
};