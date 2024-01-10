import React, { useEffect, useState } from 'react';
import { Delete, Edit } from 'react-feather';
import { useModal } from '../../hooks/useModal'; // reusable modal
import {
    deleteCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
} from '../../services/customer';
import { Modal } from '../Modals/Modal'; // reusable modal
import './styles.css';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const CustomersList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('list');
  const [customer, setCustomer] = useState<any[]>([]);
  const [customers, setCustomers] = useState([] as Customer[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [isCustomerSectionVisible, setIsCustomerSectionVisible] =
    useState(true);
  const [isCustomersSectionVisible, setIsCustomersSectionVisible] =
    useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isModalVisible, toggleModalVisibility } = useModal();

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleGetAllCustomers = async () => {
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

  const handleGetCustomerByEmail = async (email: string) => {
    try {
      const customer = await getCustomer(email);
      if (!customer || email === '') {
        showMessage(`Email ${email} Not found!`);
        setCustomer([]);
      } else {
        setCustomer([customer]);
      }

      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleUpdateCustomer = async (id: string) => {
    if (selectedId !== null) {
      const body = {
        name: selectedName || '',
        email: selectedEmail || '',
        phone: selectedPhone || '',
      };

      const emptyFields = [];

      if (!body.name) {
        emptyFields.push('Name');
      }

      if (!body.email) {
        emptyFields.push('Email');
      }

      if (!body.phone) {
        emptyFields.push('Phone');
      }

      if (emptyFields.length > 0) {
        showMessage(
          `The field (${emptyFields.join(
            ', ',
          )}) is required! Please try again.`,
        );
        return;
      }

      try {
        await updateCustomer(selectedId, body);
        showMessage('Customer updated successfully.');
        handleGetAllCustomers();

        setError(null);
      } catch (error: any) {
        setError(error);
      }
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      showMessage('Customer deleted successfully.');
      handleGetAllCustomers();

      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  // reusable modal
  const modalContent = (
    <div className="Edit-container">
      <form className="edit-form" onSubmit={e => e.preventDefault()}>
        <fieldset className="edit-fieldset">
          <h2>Edit Register</h2>
          <div className="edit-div">
            <label className="edit-label" htmlFor="name">
              Full name
            </label>
            <input
              className="edit-input"
              type="text"
              name="name"
              value={selectedName}
              onChange={e => setSelectedName(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label className="edit-label" htmlFor="email">
              Email
            </label>
            <input
              className="edit-input"
              type="email"
              name="name"
              value={selectedEmail}
              onChange={e => setSelectedEmail(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label className="edit-label" htmlFor="phone">
              Phone
            </label>
            <input
              className="edit-input"
              type="tel"
              name="phone"
              value={selectedPhone}
              onChange={e => setSelectedPhone(e.target.value)}
            />
          </div>
        </fieldset>
        <button
          className="edit-button"
          type="submit"
          title="Submit data"
          onClick={() => handleUpdateCustomer(selectedId || '')}
        >
          Submit Changes
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );

  useEffect(() => {}, []);

  return (
    <div className="List-container">
      <div className="list-contents-one">
        <form
          className="search-form"
          onSubmit={e => {
            e.preventDefault();
            handleGetCustomerByEmail(selectedEmail);
          }}
        >
          <div className="search-div">
            <input
              className="search-input"
              type="text"
              value={selectedEmail}
              placeholder="Enter with a registered email"
              onChange={e => setSelectedEmail(e.target.value)}
            />
            <button
              className="search-button"
              title="Search register"
              type="submit"
            >
              Search Register
            </button>
          </div>
        </form>

        {isCustomerSectionVisible && (
          <section>
            {customer.length > 0 && (
              <div className="list-one">
                <button
                  className="close-section-button"
                  type="reset"
                  title="Close"
                  onClick={() =>
                    setIsCustomerSectionVisible(!isCustomerSectionVisible)
                  }
                >
                  &times;
                </button>
                <h3>Register:</h3>
                <ul>
                  {customer.map(customer => (
                    <li key={customer._id}>
                      <ol>Name: {customer.name}</ol>
                      <ol>Email: {customer.email}</ol>
                      <ol>Phone: {customer.phone}</ol>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {message && <p className="message">{message}</p>}
          </section>
        )}
      </div>

      <div className="list-contents-all">
        <button
          className="search-all-button"
          type="button"
          title="Search all registers"
          onClick={handleGetAllCustomers}
        >
          Search all Registers
        </button>
        {isCustomersSectionVisible && (
          <section>
            {customers.length > 0 && (
              <div className="list-all">
                <button
                  className="close-section-button"
                  type="reset"
                  title="Close"
                  onClick={() =>
                    setIsCustomersSectionVisible(!isCustomersSectionVisible)
                  }
                >
                  &times;
                </button>
                <h3>Registers list:</h3>
                {customers.map(customer => (
                  <ul key={customer._id}>
                    <li>
                      Id: {customer._id}
                      <button
                        className="icon-edit"
                        type="button"
                        title="Edit customer"
                        onClick={() => {
                          setSelectedId(customer._id);
                          setSelectedName(customer.name);
                          setSelectedEmail(customer.email);
                          setSelectedPhone(customer.phone);
                          setSelectedItem('useModal'); // reusable modal
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
                {(message && <p className="message">{message}</p>) ||
                  (error && <p>Error: {error}</p>)}
              </div>
            )}
          </section>
        )}
      </div>

      {/* reusable modal */}
      {selectedItem === 'useModal' && (
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
