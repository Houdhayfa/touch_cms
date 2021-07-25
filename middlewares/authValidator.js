const jwt=require('jsonwebtoken')
const User=require('../models/User')



module.exports= async (req,res,next) => {
    try {
       
        const token=req.headers["x-auth-token"]

        if(!token) { 
            return res.status(401).send({msg:"Not Authorised"})
        }

        const decoded= await jwt.verify(token,process.env.SECRETKEY)
        //  console.log(decoded)

        const user = await User.findById(decoded._id).select("-password") // recherche du user à partir du id décodé par jwt
                                                                           // soustraire le password pour + sécurité
        if(!user) { 
            return res.status(401).send({msg:"This is not your account"})
        }
        
        req.user=user
        
        next()
    } 
    catch (error) {
        return res.status(500).send({msg:"Not Authorised"})
        console.log(error)  
    }
    
}