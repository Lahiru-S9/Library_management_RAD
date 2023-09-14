import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./utils/logger";
import config from "./configs";
import MongoStore from 'connect-mongo';
import { connect } from "./utils/database.connection";

import magazineRoutes from "./api/routes/magazines";
import computerRoutes from "./api/routes/computers";
import newspaperRoutes from "./api/routes/newspapers";
import bookRoutes from "./api/routes/books";
import userRoutes from "./api/routes/user";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "20mb"}));

app.use("/magazine", magazineRoutes);
app.use("/computer", computerRoutes);
app.use("/newspaper", newspaperRoutes);
app.use("/book", bookRoutes);
app.use('/api/user', userRoutes)

app.listen(PORT, () =>{
    logger.info(`🚀Server is running on port ${PORT}`);
    connect();
});



