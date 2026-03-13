import { Schema,model } from "mongoose";

//Create product schema(productid,productname,price,brand)
const productSchema=new Schema({
    //structure of product resource
    productId:{
        type:Number,
        required:[true,"product Id is required"]
    },
    productName:{
        type:String,
        required:[true,"product name is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        minprice:[10000,"minimum price is 10000"],
        maxprice:[50000,"maximum price is 50000"]
    },
    brand:{
        type:String,
        required:[true,"brand of product is required"]
    }
},{
    versionKey:false,
    timestamps:true
})
export const ProductModel=model("product",productSchema)
