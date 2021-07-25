const express=require('express')

const app=express()

const connectDB=require('./config/connectDB')

const port=process.env.PORT || 5000

const authRouter=require('./routes/auth')
const blogRouter=require('./routes/blog')



                       /* middelwares*/

 app.use(express.json())

                       /* routes */

app.use("/api/auth",authRouter)
app.use("/",blogRouter)



                       /* connection à la base de donnée */

connectDB()
                       /* connection au serveur */

app.listen(port, (err) => {
    err
    ? console.log("ERROR: connection to server failed")
    : console.log(`Listening to server on port ${port}`)
})