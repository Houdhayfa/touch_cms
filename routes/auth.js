const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validator,loginRules,registerRules}=require('../middlewares/bodyValidator')
const authValidator=require('../middlewares/authValidator')




// register
//@path http://localhost:5000/api/auth/register
// public
router.post("/register",registerRules(),validator, async (req , res) => {
    
    
    const {name,lastName,userName,password}= req.body       // req.body destructuring

                      
    

    try {
        let user= await User.findOne({userName:userName}) // recherche du user dans la base à partir de son userName

        if (user) {
            return res.status(400).send({msg:"User name already used"})
        }

        user= new User ({                     // si variable user est nulle elle prend la valeur délivrée par req.body
            name,
            lastName,
            userName,
            password
        })

        const salt= await bcrypt.genSalt(10)                   //password hash
        const hashedPassword= await bcrypt.hash(password,salt)
        user.password=hashedPassword

        await user.save()                    //enregistrement du user
        // console.log("USER SAVED.....")
        res.status(200).send({
            msg:"User registred successfully",
            user
        })
    } 
    catch (error) {
        return res.status(500).send({msg:"Server Error"})
        console.log(error)
    }
})


// login
//@path http://localhost:5000/api/auth/login
// public

router.post("/login",loginRules(),validator, async (req,res) => {
    const {userName,password}=req.body
   
    try {
        //vérifier user
        const user= await User.findOne({userName:userName})
        
        if (!user) {
            return res.status(400).send({msg:"wrong user name or password"})
        }
        //vérifier password
        let safePass= await bcrypt.compare(password,user.password)
        if (!safePass) {
            return res.status(400).send({msg:"wrong user name or password"})
        }
        //token
        const payload={ 
            _id:user._id
        }

        const token = await jwt.sign(payload,process.env.SECRETKEY)

        res.status(200).send({msg:"Logged in successfully",user:user,token:token})
    }
    catch (error) {
        res.status(500).send({msg:"ERROR: Server error"})
        console.log(error)
    }
})

// getAuthUser
//@path http://localhost:5000/api/auth/me
// private
router.get("/me",authValidator, async (req,res) => {
    
res.status(200).send({user:req.user})
})




module.exports=router























module.exports=router