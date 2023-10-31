import { Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { withdraw } from '../../controllers/atm'; // Ajuste o caminho conforme necessário
import Account from '../../models/Account';

describe('Withdraw Controller', () => {
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

  describe('withdraw', () => {
    it('should successfully withdraw with correct banknotes', async () => {
      await Account.create({
        accountNumber: '12345',
        balance: 1000,
      });

      const mockReq = {
        query: { accountNumber: '12345', amount: 180 },
      };
      const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      await withdraw(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Withdrawal successful!',
          banknotes: expect.objectContaining({
            '100': 1,
            '50': 1,
            '20': 1,
            '10': 1,
          }),
          balance: 820,
        }),
      );
    });

    it('should reject with insufficient balance', async () => {
      await Account.create({
        accountNumber: '12345',
        balance: 100,
      });

      const mockReq = {
        query: { accountNumber: '12345', amount: 150 },
      };
      const mockRes = {
        status: jest.fn(() => mockRes),
        send: jest.fn(),
      } as unknown as Response;

      await withdraw(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith('Insufficient balance');
    });

    it('should handle account not found', async () => {
      const mockReq = {
        query: { accountNumber: 'nonexistent', amount: 100 },
      };
      const mockRes = {
        status: jest.fn(() => mockRes),
        send: jest.fn(),
      } as unknown as Response;

      await withdraw(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith('Account not found');
    });

    it('should handle server errors safely', async () => {
      const mockReq = {
        query: { accountNumber: '12345', amount: 100 },
      };
      const mockRes = {
        status: jest.fn(() => mockRes),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(Account, 'findOne')
        .mockRejectedValueOnce(new Error('Forced failure'));

      await withdraw(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(
        'Internal server error: Error: Forced failure',
      );
    });
  });
});
