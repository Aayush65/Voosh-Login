import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: String,
    sub_total: Number,
    PhnNo: {
        type: Number,
        unique: true,
    },
    order: String,
});

const OrderModel = mongoose.model("User", orderSchema);

export default OrderModel;