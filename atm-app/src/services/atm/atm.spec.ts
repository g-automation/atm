import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createAccount, getAccounts, withdraw } from '.';

describe('ATM Services', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('creates an account successfully', async () => {
    const mockResponse = { account: { id: '123', balance: 0 } };
    mock
      .onPost(`${process.env.API_URL}accounts/create`)
      .reply(200, mockResponse);

    const account = await createAccount();
    expect(account).toEqual(mockResponse);
  });

  it('handles failure in account creation', async () => {
    const mockError = { message: 'Error creating account' };
    mock.onPost(`${process.env.API_URL}accounts/create`).reply(500, mockError);

    await expect(createAccount()).rejects.toEqual(mockError);
  });

  it('retrieves accounts successfully', async () => {
    const mockResponse = [{ id: '123', balance: 0 }];
    mock.onGet(`${process.env.API_URL}accounts`).reply(200, mockResponse);

    const accounts = await getAccounts();
    expect(accounts).toEqual(mockResponse);
  });

  it('handles failure in retrieving accounts', async () => {
    const mockError = { message: 'Error fetching accounts' };
    mock.onGet(`${process.env.API_URL}accounts`).reply(500, mockError);

    await expect(getAccounts()).rejects.toEqual(mockError);
  });

  it('executes a withdrawal successfully', async () => {
    const mockResponse = {
      banknotes: { '50': 1, '20': 1, '10': 1 },
      balance: 20,
    };
    const params = { accountNumber: '123', amount: 80 };
    mock
      .onPut(
        `${process.env.API_URL}atm/withdraw?accountNumber=${params.accountNumber}&amount=${params.amount}`,
      )
      .reply(200, mockResponse);

    const result = await withdraw(params);
    expect(result).toEqual(mockResponse);
  });

  it('handles failure in withdrawal', async () => {
    const mockError = { message: 'Insufficient funds' };
    const params = { accountNumber: '123', amount: 1000 };
    mock
      .onPut(
        `${process.env.API_URL}atm/withdraw?accountNumber=${params.accountNumber}&amount=${params.amount}`,
      )
      .reply(500, mockError);

    await expect(withdraw(params)).rejects.toEqual(mockError);
  });
});
