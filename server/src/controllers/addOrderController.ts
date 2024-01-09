import { Request, Response } from 'express';
import { badRequest, created, serverError } from '../views/view';
import OrderModel from '../models/Orders';

export default async function addOrderController(req: Request, res: Response) {
    try {
        const { order, sub_total } = req.body;
        if (!order || typeof sub_total !== "number" || sub_total <= 0 ) {
            badRequest(res);
            return;
        }
        const newOrder = new OrderModel({ order, sub_total, user_id: res.locals._id, phno: res.locals.phno });
        await newOrder.save();
        created(res, {message: "Order Added Successfully"});
    } catch(err) {
        serverError(res, err);
    }
}