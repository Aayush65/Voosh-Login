import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phno: {
        type: Number,
        unique: true,
    },
    pass: String,
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;