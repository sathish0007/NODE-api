import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import mongoose from "mongoose"
import cors from "cors"

const app = express();

mongoose.connect('mongodb://localhost/restApi');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

import userRoute from "./router/userRoute";

app.use('/',userRoute);
export default app;
