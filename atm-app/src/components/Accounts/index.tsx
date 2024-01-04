import './styles.css';

import React, { useEffect, useState } from 'react';
import {
  createAccount,
  deleteAccount,
  deleteAllAccounts,
  getAccounts,
} from '../../services/atm';
import { AlertCircle, Copy, Delete, Edit } from 'react-feather';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [onMouseOverButton, setOnMouseOverButton] = useState(false);

  const handleCreateAccount = async () => {
    try {
      const data = await createAccount();
      setAccounts([...accounts, data.account]);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleDeleteAccount = async (accountNumber: string) => {
    try {
      await deleteAccount(accountNumber);
      const _accounts = await getAccounts();
      setAccounts(_accounts.length > 0 ? [..._accounts] : []);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleDeleteAllAccounts = async () => {
    try {
      const _accounts = await getAccounts();
      if (
        window.confirm(
          'Do you really want to permanently delete all accounts? This action is irreversible!',
        ) === false
      ) {
        setAccounts(_accounts);
      } else {
        await deleteAllAccounts();
        setAccounts(_accounts.length);
        setError(null);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const handleMouseOver = () => {
    setOnMouseOverButton(true);
  };

  const handleMouseOut = () => {
    setOnMouseOverButton(false);
  };

  useEffect(() => {
    handleAccounts();
  }, []);

  return (
    <div className="Accounts-container">
      <button className="button" onClick={handleCreateAccount}>
        Create Account
      </button>
      {error && <p className="error">Error: {error}</p>}

      {accounts.length > 0 && (
        <div>
          <h3>Accounts List:</h3>
          <ul>
            {accounts.length > 0 &&
              accounts.map(({ accountNumber, balance }) => (
                <li key={accountNumber}>
                  <p>
                    Account Number: {accountNumber}
                    <button
                      title="Copy Account Number"
                      className="icon-copy"
                      onClick={() =>
                        navigator.clipboard.writeText(accountNumber)
                      }
                      disabled={!accountNumber}
                    >
                      <Copy />
                    </button>
                    <button title="Edit Account" className="icon-edit">
                      <Edit />
                    </button>
                    <button
                      title="Delete Account"
                      className="icon-delete"
                      onClick={() => handleDeleteAccount(accountNumber)}
                    >
                      <Delete />
                    </button>
                  </p>
                  <span>
                    Balance:{' '}
                    {balance.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
      <button
        className="button-delete-all"
        onClick={handleDeleteAllAccounts}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {onMouseOverButton && <AlertCircle />}
        Delete all Accounts
      </button>
    </div>
  );
};

export default Accounts;
