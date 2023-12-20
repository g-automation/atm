import React, { useState, useEffect } from "react";
import { Edit, Delete } from "react-feather";
import {
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} from "../../services/customer";
import { useModal } from "../../hooks/useModal"; // reusable modal
import { Modal } from "../Modals/Modal"; // reusable modal

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

const CustomersList: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState("list");
    const [customer, setCustomer] = useState<any>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");
    const [showList, setShowList] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const handleCustomers = async () => {
        try {
            const data = await getAllCustomers();
            if (data) {
                setCustomers(data.customers);
            }

            setError(null);
        } catch (error: any) {
            setError(error);
        }
    };

    const handleSearchCustomerByEmail = async (email: string) => {
        try {
            const data = await getCustomer(email);
            if (!data) {
                showMessage(`Email "${email}" not found!`);
            } else {
                setCustomer(data.customer);
            }

            setError(null);
        } catch (error: any) {
            setError(error);
        }
    };

    const handleUpdateCustomer = async (id: string) => {
        if (selectedId !== null) {
            const body = {
                name: selectedName || "",
                email: selectedEmail || "",
                phone: selectedPhone || "",
            };

            if (!body.name || !body.email || !body.phone) {
                showMessage("All fields are mandatory! Please try again.");
            };

            try {
                await updateCustomer(selectedId, body);
                showMessage("Customer updated successfully.");
                await handleCustomers();

                setError(null);
            } catch (error: any) {
                setError(error);
            }
        }
    };

    const handleDeleteCustomer = async (id: string) => {
        try {
            await deleteCustomer(id);
            showMessage("Customer deleted successfully.");
            handleCustomers();

            setError(null);
        } catch (error: any) {
            setError(error);
        }
    };

    // reusable modal
    const { isModalVisible, toggleModalVisibility } = useModal();
    const modalContent: React.ReactNode = (
        <div className="Edit-container">
            <form className="edit-form"
                onSubmit={(e) => e.preventDefault()}
            >
                <fieldset className="edit-fieldset">
                    <h2>Edit Register</h2>
                    <div className="edit-div">
                        <label className="edit-label" htmlFor="name">Full name</label>
                        <input
                            className="edit-input"
                            type="text"
                            name="name"
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                        />
                    </div>
                    <div className="edit-div">
                        <label className="edit-label" htmlFor="email">Email</label>
                        <input
                            className="edit-input"
                            type="email"
                            name="name"
                            value={selectedEmail}
                            onChange={(e) => setSelectedEmail(e.target.value)}
                        />
                    </div>
                    <div className="edit-div">
                        <label className="edit-label" htmlFor="phone">Phone</label>
                        <input
                            className="edit-input"
                            type="tel"
                            name="phone"
                            value={selectedPhone}
                            onChange={(e) => setSelectedPhone(e.target.value)}
                        />
                    </div>
                </fieldset>
                <button
                    className="edit-button"
                    type="submit"
                    title="Submit data"
                    onClick={() => handleUpdateCustomer(selectedId || "")}
                >
                    Submit Changes
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );

    useEffect(() => {
        if (showList) {
            handleCustomers();
        }
    }, [showList]);

    return (
        <div className="Customers-container">
            {!showList && (
                <div className="search-div">
                    <input
                        className="search-input"
                        type="text"
                        value={selectedEmail}
                        placeholder="Enter with a registered email"
                        onChange={(e) => setSelectedEmail(e.target.value)}
                    />
                    <button
                        className="search-button"
                        onClick={() => handleSearchCustomerByEmail(selectedEmail)}
                    >
                        Search Register
                    </button>

                    {customer && (
                        <div className="list-one">
                            <h3>Register:</h3>
                            <ul>
                                <ol>Name: {customer.name}</ol>
                                <ol>Email: {customer.email}</ol>
                                <ol>Phone: {customer.phone}</ol>
                            </ul>
                            {message && <p className="message">{message}</p>}
                        </div>
                    )}
                    <button
                        className="search-all-button"
                        onClick={() => setShowList(true)}
                    >
                        List all Registers
                    </button>
                </div>

            )}

            {showList && (
                <div>
                    {customers.length > 0 && (
                        <div className="list-all">
                            <h3>Registers list:</h3>
                            {customers.map((customer) => (
                                <ul key={customer._id}>
                                    <li>Id: {customer._id}
                                        <button
                                            className="icon-edit"
                                            type="button"
                                            title="Edit customer"
                                            onClick={() => {
                                                setSelectedId(customer._id);
                                                setSelectedName(customer.name);
                                                setSelectedEmail(customer.email);
                                                setSelectedPhone(customer.phone);
                                                setSelectedItem("useModal"); // reusable modal
                                                toggleModalVisibility(); // reusable modal
                                            }}
                                        >
                                            <Edit />
                                        </button>
                                        <button
                                            className="icon-delete"
                                            type="button"
                                            title="Delete Customer"
                                            onClick={() => handleDeleteCustomer(customer._id)}
                                        >
                                            <Delete />
                                        </button>
                                    </li>
                                    <ol>Name: {customer.name}</ol>
                                    <ol>Email: {customer.email}</ol>
                                    <ol>Phone: {customer.phone}</ol>
                                    <br />
                                </ul>
                            ))}
                            {
                                (message && <p className="message">{message}</p>) ||
                                (error && <p>Error when listing customers: {error}</p>)
                            }
                        </div>
                    )}
                </div>
            )}

            {/* reusable modal */}
            {selectedItem === "useModal" && (
                <Modal
                    isVisible={isModalVisible}
                    toggleVisibility={toggleModalVisibility}
                    modalContent={modalContent}
                />
            )}
        </div>
    );
};

export default CustomersList;
