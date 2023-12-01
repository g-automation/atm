import React, { useState, useEffect } from "react";
import { getAllCustomers } from "../../services/customer";

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

const CustomersList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleCustomers = async () => {
        try {
            const data = await getAllCustomers();
            if (data) {
                setCustomers(data.customers);
            } else {
                setError('No data found.')
            }
            setError(null);
        } catch (error: any) {
            setError(error);
        }
    };

    useEffect(() => {
        handleCustomers();
    }, []);

    return (
        <div className="Customers-container">
            <h3>Registers list:</h3>
            <ul>
                {customers.map((customer) => (
                    <li key={customer._id}>
                        <ul>Id: {customer._id}</ul>
                        <ul>Name: {customer.name}</ul>
                        <ul>Email: {customer.email}</ul>
                        <ul>Phone: {customer.phone}</ul>
                        <br />
                    </li>
                ))}
            </ul>
            {error && <p>Error when listing customers: {error}</p>}

        </div>
    );
};

export default CustomersList;
