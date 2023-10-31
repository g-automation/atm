import { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { getAccounts, createAccount } from '../../controllers/accounts';
import Account from '../../models/Account';

describe('Account Controller', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Account.deleteMany({});
  });

  describe('getAccounts', () => {
    it('should retrieve all accounts if no account number is specified', async () => {
      await Account.create([
        { accountNumber: '12345' },
        { accountNumber: '67890' },
      ]);

      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
      } as unknown as Response;

      await getAccounts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Object), expect.any(Object)]),
      );
    });

    it('should handle errors safely', async () => {
      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn(() => mockRes),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(Account, 'find')
        .mockRejectedValueOnce(new Error('Forced failure'));

      await getAccounts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(
        "Internal server error: TypeError: Cannot destructure property 'accountNumber' of 'req.query' as it is undefined.",
      );
    });
  });

  describe('createAccount', () => {
    it('should create a new account successfully', async () => {
      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
      } as unknown as Response;

      await createAccount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Account created successfully!',
          account: expect.any(Object),
          balance: expect.any(Number),
        }),
      );
    });

    it('should handle creation errors safely', async () => {
      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn(() => mockRes),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(Account.prototype, 'save')
        .mockRejectedValueOnce(new Error('Forced failure'));

      await createAccount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(
        'Error creating a new account: Error: Forced failure',
      );
    });
  });
});
