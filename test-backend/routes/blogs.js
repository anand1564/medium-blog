const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
    cb(null, true);
  }
});

// Get all blogs with author, tags, and images
router.get('/all', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tags: true,
        Image: true
      },
      orderBy: {
        id: 'desc'
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        Tags: true,
        Image: true
      }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create new blog post with images and tags
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { title, content, authorId, tags } = req.body;
    const files = req.files;

    // Create the blog post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        Tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        },
        Image: {
          create: files?.map(file => ({
            url: `/uploads/${file.filename}`
          })) || []
        }
      },
      include: {
        Tags: true,
        Image: true
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const postId = req.params.id;

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        Tags: {
          set: [], // Remove existing tags
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        Tags: true,
        Image: true
      }
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post
router.delete('/:id', async (req, res) => {
  try {
    // Delete associated images first
    await prisma.image.deleteMany({
      where: { postId: req.params.id }
    });

    // Delete the post (this will automatically handle tag relationships)
    await prisma.post.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Add images to existing post
router.post('/:id/images', upload.array('images', 5), async (req, res) => {
  try {
    const files = req.files;
    const postId = req.params.id;

    const images = await prisma.image.createMany({
      data: files.map(file => ({
        url: `/uploads/${file.filename}`,
        postId
      }))
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Delete image
router.delete('/images/:imageId', async (req, res) => {
  try {
    await prisma.image.delete({
      where: { id: req.params.imageId }
    });

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;