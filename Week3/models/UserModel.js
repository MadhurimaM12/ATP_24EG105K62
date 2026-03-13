// step1:if you want to design schema of any resource first we need to import
import { Schema, model,Types} from "mongoose";

// create Cart schema {product,count}
const cartSchema = new Schema({
    product:{
       type:Types.ObjectId,  
       ref:"product"
    },
    count: {
        type:Number,
        default:1
    }
})

// Create User Schema(Username,password,email,age)
const userSchema = new Schema({
    // we can pass the structure of the resource
    username: {
        type: String,
        required: [true, "Username is Required"],// how it works
        minLength
        : [4, "Min Length of User Name is 4 Characters"],
        maxLength: [6, "Username size exceeds 6 chars"]
        // pattern:["/uf"]
    },
    password: {
        type: String,
        required: [true, "Password Required"]
    },
    email: {
        type: String,
        required: [true, "Email Required"],
        unique : [true,"Email Already Existed"]
    },
    age: {
        type: Number
    },
    cart : [cartSchema], 
}, 
{
    versionKey: false,
    timestamps: true
});
// Generate UserModelclear
export const userModel = model("user", userSchema) 





// string -- js datatype
// String -- mongoose schema datatype
