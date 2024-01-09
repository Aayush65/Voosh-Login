import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: String,
    sub_total: Number,
    phno: Number,
    order: String,
});

const OrderModel = mongoose.model("User", orderSchema);

export default OrderModel;