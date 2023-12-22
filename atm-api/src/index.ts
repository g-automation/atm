import "dotenv/config";

import express from "express";
import mongoose, { Error } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import statusRoutes from "./routes/status";
import accountsRoutes from "./routes/accounts";
import atmRoutes from "./routes/atm";
import customersRoutes from "./routes/customers";
import authenticationRoutes from "./routes/authentication";

const app = express();
const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((error: Error) => console.log(error));

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", statusRoutes);
app.use("/accounts", accountsRoutes);
app.use("/atm", atmRoutes);
app.use("/customers", customersRoutes);
app.use("/authentication", authenticationRoutes);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
