import mongoose from "mongoose"

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName:String,
    mobile:Number,
    email:{type:String,required:true},
    password:String
});

const User = mongoose.model('User',userSchema);

export default User;