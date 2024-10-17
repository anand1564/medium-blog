

const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("user route");
})
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload',upload.single('file'),(req,res)=>{
    const {title,description} = req.body;
    res.send(`Title: ${title}, Description: ${description}`);
})

module.exports = router;