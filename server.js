const express=require('express')

const app=express()

const connectDB=require('./config/connectDB')

const port=process.env.PORT || 5000












                    /* connection au serveur */

connectDB()
                    /* connection au serveur */

app.listen(port, (err) => {
    err
    ? console.log("ERROR: connection to server failed")
    : console.log(`Listening to server on port ${port}`)
})