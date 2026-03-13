/*Create Product REST API with below features
1. Product document structure
        a.productId (required)
        b.productName(required)
        c.price(required, min price 10000 and max price 50000)
        d.brand(required)
2. REST API with below operations
        a. Create product
        b. Read all products
        c. Read a product by productId
        d. Update a product by productId
        e. Delete a product by productId*/
import exp from 'express'
import { ProductModel } from '../models/ProductModel.js'
export const productApp=exp.Router()

//Product REST API routes
//Create product
productApp.post("/products",async(req,res)=>{
    const newProduct=req.body
    const newProductDocument=new ProductModel(newProduct)
    await newProductDocument.save()
    res.status(201).json({message:"product created"})
})

//read all products
productApp.get("/products",async(req,res)=>{
    let productsList=await ProductModel.find()
    res.status(200).json({message:"products",payload:productsList})
})

//read product by  id 
   productApp.get("/products/:id",async(req,res)=>{
    //read objects id from req params
    const pid=req.params.id
    //find product by id
    const ProductObj=await ProductModel.findOne({_id:pid})
    //if product not found
    if(!ProductObj){
        res.status(404).json({message:"product not found"})
    }
    //send response
    res.status(200).json({message:"product",payload:ProductObj})
   })

//update a product by id
    productApp.put("/products/:id",async(req,res)=>{
        //get modified product from req
        const modifiedProduct=req.body;
        const pid=req.params.id;
        //find product by id and update
        const updatedProduct=await ProductModel.findByIdAndUpdate(pid,{$set:{...modifiedProduct}},{new:true,runValidators:true},
        );
        //send response
        res.status(200).json({message:"product updated",payload:updatedProduct})
    })

//delete a product by id 
    productApp.delete("/products/:id",async(req,res)=>{
        //get id from req params
        let pid=req.params.id;
        //find and delete product by id
        let deletedProduct=await ProductModel.findByIdAndDelete(pid);
        if(!deletedProduct){
            return res.status(404).json({message:"product not found"})
        }
        //send response
        res.status(200).json({message:"product deleted",payload:deletedProduct})
    })