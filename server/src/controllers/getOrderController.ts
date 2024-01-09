import { Request, Response } from 'express';
import { badRequest, forbidden, notFound, serverError, statusOkay } from '../views/view';
import OrderModel from '../models/Orders';

export default async function getOrderController(req: Request, res: Response) {
    try {
        const user_id = res.locals.user_id;
        const OrderData = await OrderModel.findOne({ user_id })
        if (!OrderData) {
            notFound(res);
            return;
        }
        statusOkay(res, OrderData);
    } catch(err) {
        serverError(res, err);
    }
}