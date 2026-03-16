import exp from 'express'
const app=exp() //internally contains the http server
import { userApp } from './APIs/userAPI.js';
import { productApp } from  './APIs/productAPI.js';

//use body body parser middleware
app.use(exp.json())
//create custom middleware
function middleware1(req,res,next)
{
    //send res from middleware
    //res.json({message:"This res from middleware"})
    console.log("middleware executed")
    next()
}
function middleware2(req,res,next)
{
    //send res from middleware
    //res.json({message:"This res from middleware"})
    console.log("middleware executed 2")
    next()
}
//use middleware
app.use(middleware1)
app.use(middleware2)
//forward  request to userApi if path starts with /user-api
app.use('/user-api',userApp)
//forward request to productApi if path starts with /product-api
app.use('/product-api',productApp)
//set a port number
const port=1218;
//assign port number to HTTP server
app.listen(port,()=>console.log(`Server listening port ${port}...`))


