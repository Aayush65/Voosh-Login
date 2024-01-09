import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    PhnNo: {
        type: Number,
        unique: true,
    },
    pass: String,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;