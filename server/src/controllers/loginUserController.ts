import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest, forbidden, serverError, statusOkay } from '../views/view';
import UserModel from '../models/Users';
import { compare } from '../utils/hash';

export default async function loginUserController(req: Request, res: Response) {
    try {
        const { phno, pass } = req.body;
        if (!phno || !pass || typeof phno !== "number" || phno.toString().length !== 10) {
            badRequest(res);
            return;
        }
        const userData = await UserModel.findOne({phno});
        if (!userData || !await compare(pass, userData.pass as string)) {
            forbidden(res);
            return;
        }
        const { _id, name } = userData;
        const accessToken = jwt.sign({ _id, isAccessToken: true }, (process.env.SECRET_KEY as string), {expiresIn: '1m'});
        const refreshToken = jwt.sign({ _id, isAccessToken: false }, (process.env.SECRET_KEY as string), {expiresIn: '5m'});
        statusOkay(res, { accessToken, refreshToken, name, message: "Login Successful" });
    } catch(err) {
        serverError(res, err);
    }
}