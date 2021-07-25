const router=require('express').Router()
const Blog=require('../models/Blog')
const {validator,blogRules}=require('../middlewares/bodyValidator')
const authValidator=require('../middlewares/authValidator')

// get  blog by id
//@path http://localhost:5000/:id
// public
router.get('/:id', async (req,res) => {
    const id=req.params.id
   
    const blog= await Blog.findById(id)
     try {
         return res.status(200).send({msg:"Blog found",blog:blog})
     } 
     catch (error) {
         return res.status(500).send({msg:"Server Error"})
         console.log(error)
     }
 })

// add  blog
//@path http://localhost:5000/add
// private user
router.post('/add', authValidator,blogRules(),validator, async (req,res) => {
    
    const {metaDesc,title,picURL,content}=req.body
    const blog=new Blog ({
     metaDesc,
     title,
     picURL,
     content
     })
     try {
          await blog.save()
          return res.status(200).send({msg:"Blog saved sucessfully",blog:blog})
     } 
     catch (error) {
         return res.status(500).send({msg:"Server Error"})
         console.log(error)
     }
 })

// edit  blog
//@path http://localhost:5000/edit
// private user
router.put('/edit/:id', authValidator,blogRules(),validator, async (req,res) => {
    const id=req.params.id
    const {metaDesc,title,picURL,content}=req.body
    
     try {
         const updatedBlog =await Blog.findOneAndUpdate({_id:id},{$set:{metaDesc,title,picURL,content}})
         return res.status(200).send({msg:"Blog updated successfully",
                               blog:updatedBlog})
     } 
     catch (error) {
         return res.status(500).send('Server error')
         console.log(error)
     }
 })

// delete  blog
//@path http://localhost:5000/delete/:id
// private user
router.delete('/delete/:id', authValidator, async (req,res) => {
    const id=req.params.id
     try {
          const deletedBlog =await Blog.findByIdAndDelete(id)

          if(!deletedBlog) {
             return res.status(400).send({msg:"Blog not found"})
          }

         res.status(200).send({msg:"Blog deleted sucessfully",
                               blog:deletedBlog})
     } 
     catch (error) {
         res.status(500).send(error)
         console.log(error)
     }
 })






 module.exports=router