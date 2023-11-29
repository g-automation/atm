import './styles.css';

import React, { useEffect, useState } from "react";

const Customers: React.FC = () => {
    //const [customers, setCustomers] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleValuesInput = () => {
        try {
            const data = { name, email, phone, password };
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setPassword(data.password);
            setError(null);
        } catch (error: any) {
            setError(error);
        }
    };

    // const handleRegisterCustomer = async () => {
    //     try {
    //         const data = await register({ name, email, phone, password });
    //         setCustomers(data)
    //         setCustomers(customers);
    //         setError(null);
    //     } catch (error: any) {
    //         setError(error);
    //     }
    // };

    // const handleCustomers = async () => {
    //     try {
    //         const data = await getAllCustomers();
    //         setCustomers(data);
    //         setError(null);
    //     } catch (error: any) {
    //         setError(error);
    //     }
    // }

    useEffect(() => {

    },);

    return (
        <div className="customer-container">
            <main>
                <form
                    className="customer-form"
                    onSubmit={handleValuesInput}
                >
                    <h3>Register Customer</h3>
                    <label className="customer-label">Full name </label>
                    <input
                        className="customer-input"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter your full name"
                        onChange={e => setName(e.target.value)}
                    />
                    <br /><br />
                    <label className="customer-label">Email </label>
                    <input
                        className="customer-input"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your best email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br /><br />
                    <label className="customer-label">Phone </label>
                    <input
                        className="customer-input"
                        type="tel"
                        name="phone"
                        value={phone}
                        placeholder="-- ----- ----"
                        onChange={e => setPhone(e.target.value)}
                    />
                    <br /><br />
                    <label className="customer-label">Password </label>
                    <input
                        className="customer-input"
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Create an access password"
                    />
                    <br /><br />
                    <button
                        className="customer-button"
                        onClick={() => { }}
                    >
                        Register
                    </button>

                    {error && <p className="error">Error: {error}</p>}
                </form>
                <br />
                <div>
                    <button
                        className="customer-button"
                        onClick={() => { }}
                    >
                        Show all Customers
                    </button>

                    {error && <p className="error">Error: {error}</p>}
                </div>
            </main>
            <div>

            </div>
        </div>

    );
}

export default Customers;
