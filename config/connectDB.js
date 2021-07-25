const mongoose = require('mongoose')
require('dotenv').config({path:'./config/.env'})    // la variable a été enregistrée dans le dossier config 

module.exports = async function () {
   try {
       await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
       console.log("Connected successfully to database ....")
   } 
   catch (error) {
    console.log("ERROR: connection to database failed ....")
   }
}

