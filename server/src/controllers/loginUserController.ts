import { Request, Response } from 'express';
import { badRequest, forbidden, serverError, statusOkay } from '../views/view';
import UserModel from '../models/Users';
import { compare } from '../utils/hash';

export default async function loginUserController(req: Request, res: Response) {
    try {
        const { phno, pass } = req.body;
        if (!phno || !pass || phno.toString().length !== 10) {
            badRequest(res);
            return;
        }
        const userData = await UserModel.findOne({phno});
        if (!userData || !await compare(pass, userData.pass as string)) {
            forbidden(res);
            return;
        }
        statusOkay(res, {message: "Login Successful"});
    } catch(err) {
        serverError(res, err);
    }
}