const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Ensure to import PrismaClient
const router = express.Router();
const prisma = new PrismaClient(); // Instantiate PrismaClient

router.post('/create', async (req, res) => {
    // Directly destructure req.body without await
    const { email, password } = req.body; // No await needed here
    
    try {
        const response = await prisma.user.create({
            data: {
                email,
                password
            }
        });
        if (response) {
            res.json({
                userId: response.id, // Use response instead of user
                email: email,
                password: password // Be cautious about sending passwords in responses
            });
        }
    } catch (error) {
        console.error(error); // Use console.error for better error visibility
        res.status(500).send("Internal Server Error"); // Send error response to client
    }
});

module.exports = router;
