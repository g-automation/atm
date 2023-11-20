// import User from '../models/User';
// import { Request, Response } from 'express';

// const getUsers = async (req: Request, res: Response) => {
//     try {
//         await User.find();
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };

// const getUserByEmail = async (req: Request, res: Response, email: string) => {
//     try {
//         await User.findOne({ email });
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };

// const getUserBySessionToken = async (req: Request, res: Response, sessionToken: string) => {
//     try {
//         await User.findOne({ 'authentication.sessionToken': sessionToken, });
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };

// const getUserById = async (req: Request, res: Response, id: string) => {
//     try {
//         await User.findById(id);
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };

// const createUser = async (req: Request, res: Response, values: Record<string, any>) => {
//     try {
//         await new User(values).save().then((user) => user.toObject());
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };

// const deleteUserById = async (req: Request, res: Response, id: string) => {
//     try {
//         await User.findOneAndDelete({ _id: id });
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };

// const updateUserById = async (
//     req: Request,
//     res: Response,
//     id: string,
//     values: Record<string, any>) => {
//     try {
//         await User.findByIdAndUpdate(id, values);
//         return res.status(200).json({
//             message: 'User updated successfully!',
//         });
//     } catch (error) {
//         return res.status(500).send(`Internal server error: ${error}`);
//     }
// };
// export {
//     getUsers,
//     getUserByEmail,
//     getUserBySessionToken,
//     getUserById,
//     createUser,
//     deleteUserById,
//     updateUserById
// };