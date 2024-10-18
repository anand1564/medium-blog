

const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/',(req,res)=>{
    res.send("user route");
})
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/:id/upload',upload.single('file'),async (req,res)=>{
    const userId="53d7775a-a8fa-49eb-b16f-f696cf642dda"
    const {title,description,tags} = req.body;
    try {
        const response = await prisma.post.create({
            data:{
                title,
                content:description,
                authorId: userId,
            }
        })
        if(response){
            res.send("Blog created successfully");
        } 
    } catch (error) {
        console.log(error);
    }
})
router.get('/all',async(req,res)=>{
    const response = await prisma.post.findMany({
        include:{
            file:true
        }
    })
    if(response){
        res.send(response);
    }else{
        console.log("No blogs found");
    }
})
module.exports = router;