
// create mini express application(Seperate Route)
// main express contains instance of HTTP 
import exp from "express"
import { userModel } from "../models/UserModel.js"
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {verifyToken } from '../middleware/verifyToken.js'
const {sign} = jwt 

export const userApp = exp.Router()

//User Login
userApp.post('/auth',async(req,res)=>{
    //get user cred obj from client
  const {email,password} = req.body;
  // verify email
  let user = await userModel.findOne({email:email})
  //if email not existed
  if(user===null){
    return res.status(400).json({message:"Invalid Email"})
  }
  // if user existed then we have to compare the passwords
let result = await compare(password,user.password)
    // if passwords not matches
    if(result === false){
        return res.status(400).json({message:"Invalid Password"})
    }
    // if passwords are matched
    // create token(Json web token or JWT or jaat)
    const signedToken = sign({email:user.email},process.env.SECRET_KEY,{expiresIn:100})
 
    res.cookie("token",signedToken,{
        httpOnly:true, 
        sameSite:"lax", 
        secure:false col
    })
    //send res
    res.status(200).json({message:"login successful",payload:user})
});
// DEFINE USER REST API  ROUTES 
// Create new User
userApp.post("/users", async (req, res) => {
    // get new user object from request
    const newUser = req.body;
    //hash the password
   const hashedPassword =  await hash(newUser.password,10)
   // replace plain password with hashed password
   newUser.password = hashedPassword;
    // Create new User Document (Document will be created in the database)
    const newUserDocument = new userModel(newUser)
    // save
    await newUserDocument.save()
    // send res
    res.status(201).json({ message: "User Created" });
});

// Read All Users(protected route)
userApp.get("/users",verifyToken,async(req,res)=> {
    // get user details
    let userDetails = req.user;
    // read all users from db
    let usersList = await userModel.find()
    // send res 
    res.status(200).json({message:"users",payload:usersList})
});

// Read a user by Object Id
userApp.get("/user",verifyToken,async(req,res)=>{
    // read user email from req
    
   const userObj =  await userModel.findOne({email:emailOfUser}).populate("cart.product")
    if(!userObj){
        return res.status(404).json({message:"User Not Found"})
    }
   // send res 
   res.status(200).json({message:"user",payload:userObj})
});

// Update User By id
userApp.put("/users/:id",async(req,res)=>{
    // get modified user from req
    const modifiedUser = req.body;
    const uid = req.params.id;
     // hash password if updating password
    if(modifiedUser.password){
        const hashedPassword = await hash(modifiedUser.password,10)
        modifiedUser.password = hashedPassword
    }
// get user by id and update
    //userModel.findById(uid)
    // findOne
  const updateduser = await userModel.findByIdAndUpdate(uid,
    {$set:{...modifiedUser}},
    {new:true,runValidators:true}
);
    // send res
    res.status(200).json({message:"User modification",payload:updateduser})
});
// delete user by id
userApp.delete("/users/:id", async (req, res) => {
    const uid = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(uid);

    res.status(200).json({
        message: "User deleted",
        payload: deletedUser
    });
});

// add product to cart 
userApp.put("/cart/product-id/:pid",async(req,res)=> {
    // get product id ftom url param
    let productId = req.params.pid;
    // get current user details
   const emailOfUser = req.user?.email;
  
    // add product to cart
    let result = await userModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:productId}}})
    // if user is invalid
    if(!result) {
        return res.status(404).json({message:"User Not Found"})
    }
    res.status(200).json({message:"Product added to cart"})
})

