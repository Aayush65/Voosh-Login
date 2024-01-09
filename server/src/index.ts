import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import addUserController from './controllers/addUserController';
import loginUserController from './controllers/loginUserController';
import AuthMiddleWare from './middlewares/AuthMiddleware';
import getOrderController from './controllers/getOrderController';
import addOrderController from './controllers/addOrderController';
import { issueTokenController } from './controllers/issueTokenController';

config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res: Response) => res.status(200).send({message: "Sever Online"}));
app.get("/renew-token", issueTokenController);

app.post("/add-user", addUserController);
app.post("/login-user", loginUserController);

app.use(AuthMiddleWare);
app.post("/add-order", addOrderController);
app.get("/get-order", getOrderController);


mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.clear();
        console.log(`Connected to MongoDB and Listening on Port ${process.env.PORT}`);
        app.listen(process.env.PORT);
    })