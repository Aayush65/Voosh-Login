import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { serverError, statusOkay, unauthAccess } from "../views/view";
import { ObjectId } from 'mongodb';
import UserModel from '../models/Users';

interface jwtPayload {
    _id: ObjectId,
    isAccessToken: boolean
}

export async function issueTokenController(req: Request, res: Response) {
    try {
        const refreshTokenHeader = req.headers.authorization;
        if (!refreshTokenHeader) {
            unauthAccess(res);
            return;
        }
        const refreshJWTToken = refreshTokenHeader.split(' ')[1];
        if (!refreshJWTToken) {
            unauthAccess(res);
            return;
        }
        const decodedjwt = (jwt.verify(refreshJWTToken, (process.env.SECRET_KEY as string)) as jwtPayload);
        if (!decodedjwt._id || decodedjwt.isAccessToken){
            unauthAccess(res);
            return;
        }
        const _id = decodedjwt._id;
        const accessToken = jwt.sign({ _id, isAccessToken: true }, (process.env.SECRET_KEY as string), {expiresIn: '30m'});
        const refreshToken = jwt.sign({ _id, isAccessToken: false }, (process.env.SECRET_KEY as string), {expiresIn: '1d'});
    
        const userData = await UserModel.findById({ _id });
        if (!userData) {
            unauthAccess(res);
            return;
        }
        const { name } = userData;
        statusOkay(res, { accessToken, refreshToken, name })  
    } catch(err) {
        serverError(res, err);
    }
}