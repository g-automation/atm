import { Router } from "express";

import authentication from "./authentication";
import customers from "./customers";

const router = Router();

export default (): Router => {
    authentication(router);
    customers(router);

    return router;
};