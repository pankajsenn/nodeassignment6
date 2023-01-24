const router = require('express').Router();
const { query } = require('express');
const Blog = require('../models/Blog')
const bodyparser= require("body-parser");

// Your routing code goes here
router.use(bodyparser.json());

//get handler
router.get('/blog', async (req,res)=>{
    try{
    const {page = 1 , search=""} = req.query;
    console.log(req.query.page);
    console.log(search);
    var blogs;
    if(search ==""){
        blogs = await Blog.find().skip((page-1)*5).limit(5);
        res.json({
            status:"success",
            result: blogs
            }
            )
    }else{
        blogs = await Blog.find({topic : search});
        res.json({
            status:"success",
            result: blogs
            }
            )
    }
    }catch(e){
        res.json({
            status:"failure",
            result: e.message
            }
            )
    }
})

//post handler
router.post('/blog',async (req,res)=>{
    try{
        console.log(req.body)
       let blogs = await Blog.insertMany(req.body);
       res.status(201).json({
        status:"success",
        result: blogs
       })
    }catch(e){
        res.status(400).json({
            status:"failed",
            result: e.message
           })
    }
})

//put part
router.put('/blog/:id',async(req,res)=>{
    try{
    let id = req.params.id;
    var update = req.body;
    console.log(update);
    let blogs = await Blog.updateOne({_id:id},update);
    res.status(200).json({
        status : "success",
        result: blogs
    })
    }catch(e){
        res.status(400).json({
            status : "Failure",
            result: e.message
        })
    }
})
//Delete part

router.delete("/blog/:id",async(req,res)=>{
    try{
        let id = req.params.id;
        let deleted = await Blog.find({_id:id});
        let blogs = await Blog.deleteOne({_id:id});
        res.status(200).json({
            status : "success",
            result: deleted
        })
        }catch(e){
            res.status(400).json({
                status : "Failure",
                result: e.message
            })
        }
})
module.exports = router;