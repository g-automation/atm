import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
},
    { timestamps: true } //save record/update creation date
);

export const Customer = mongoose.model('Customer', customerSchema);

// acões usadas em controllers/customers
export const getCustomers = () => Customer.find();
export const getCustomerByEmail = (email: string) => Customer.findOne({ email });
export const getCustomerBySessionToken = (sessionToken: string) => Customer.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getCustomerById = (id: string) => Customer.findById(id);
export const createCustomer = (values: Record<string, any>) => new Customer(values).save().then((Customer) => Customer.toObject());
export const deleteCustomerById = (id: string) => Customer.findOneAndDelete({ _id: id });
export const updateCustomerById = (id: string, values: Record<string, any>) => Customer.findByIdAndUpdate(id, values);