import jwt from 'jsonwebtoken'
const {verify} = jwt 

export function verifyToken(req, res, next) {
  // Token verification logic here

    //console.log("Token Obj is:",req.cookies)
  const token = req.cookies?.token;

  // if req from unauthorized user
 if(!token) {
    return res.status(401).json({message:"Please Login"})
 }
 try {
 // if token existed

 // verify tokens returns the error..
   const decodedToken = verify(token,process.env.SECRET_KEY)
   console.log(decodedToken)
   // attach decoded user to req
   req.user = decodedToken;
   
   // call next

   next();
}catch(err) {
      res.status(401).json({message:"Session Expired.plz relogin"})
}
}
