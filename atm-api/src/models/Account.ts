import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 10000,
    },
  },
  balance: {
    type: Number,
    required: true,
    default: 10000,
  },
},
  { timestamps: true } //save record/update creation date
);

const Account = mongoose.model('Account', Schema);

export default Account;