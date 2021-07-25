const {body, validationResult}=require('express-validator')


const loginRules = () => [           // règles de validation sous forme de tableaux
body("userName","User name is required").notEmpty(),
body("password","Password is required and must contain at least 6 characters").notEmpty()
                                                                              .isLength({min:6,max:20})
]

const registerRules = () => [
    body("name","Name is required").notEmpty(),
    body("lastName","Last name is required").notEmpty(),
    body("userName","User name is required").notEmpty(),
    body("password","Password is required and must contain at least 6 characters").notEmpty()
                                                                                  .isLength({min:6,max:20})
]

const blogRules = () => [
    body("metaDesc","MetaDesc is required").notEmpty(),
    body("title","Title is required").notEmpty(),
    body("picURL","Picture URL is required").notEmpty(),
    body("content","Content is required and must contain at least 15 characters").notEmpty()
                                                                                 .isLength({min:15})
]

const validator = (req,res,next) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){   // S'il y a des erreurs de validations les erreurs seront renvoyé sous forme de tableau
        res.status(400).send({errors:errors.array().map(el => ({msg:el.msg}))})
    }
    next()
}

module.exports={validator,loginRules,registerRules,blogRules}