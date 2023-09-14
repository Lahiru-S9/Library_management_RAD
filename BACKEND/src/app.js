import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import logger from "./utils/logger";
import config from "./configs";
import MongoStore from 'connect-mongo';
import { connect } from "./utils/database.connection";

import bookRoutes from "./api/routes/books";
import userRoutes from "./api/routes/user";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "20mb"}));


app.use("/book", bookRoutes);
app.use('/api/user', userRoutes)

app.listen(PORT, () =>{
    logger.info(`🚀Server is running on port ${PORT}`);
    connect();
});



