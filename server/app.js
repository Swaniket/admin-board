import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/clientRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

/* CONFIG */
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
/* 
ROUTE DESCRIPTION - 
    /client: Represents all the API required for Client Facing Pages.
    /sales: Represents all the API required for Sales Page Data.
    /management: Represents all the API required for the Management Section.
    /general: Represents all other APIs, like Users, Authentication.
*/
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

/* MONGOOSE SETUP & Start Server */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
  })
  .catch((err) => {
    console.log(`${err} Didn't Connect`);
  });
