const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');  // Destructure PrismaClient
const app = express();

const prisma = new PrismaClient();

const port = 3000;
const upload = multer({ dest: 'uploads/' });
const userRouter = require("./routes/user");
app.post('/upload', upload.single('file'), (req, res) => {
    res.send("File uploaded successfully");
});
app.use("/user",userRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.listen(port, async () => {
    try {
        await prisma.$connect();  // Ensure the database is connected
        console.log("Database connected");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }

    console.log(`Server is running on port ${port}`);
});
