// import { Request, Response } from "express";
// import { random, authentication } from "../helpers";
// import { createUser } from "./users";

// const register = async (req: Request, res: Response) => {
//     try {
//         const { email, password, username } = req.body;
//         if (!email || !password || !username) {
//             return res.status(400);
//         }

//         const salt = random();
//         const user = await createUser({
//             email,
//             username,
//             authentication: {
//                 salt,
//                 password: authentication,
//             },
//         });
//         return res.status(200).json(user).end();

//     } catch (error) {
//         console.log(error);
//         return res.status(400);
//     }
// };
// export { register };

