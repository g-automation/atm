import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 10000,
  },
});

const Account = mongoose.model('Account', Schema);

export default Account;