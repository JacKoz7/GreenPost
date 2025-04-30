const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');
const multer = require('multer');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});
const upload = multer({ storage: storage });

// Fetch all posts with likes
router.get('/', async (req, res) => {
    const listofPosts = await Posts.findAll({ include: [Likes] });
    res.json(listofPosts);
});

router.post('/', validateToken, upload.single('image'), async (req, res) => {
    const post = req.body;
    post.Username = req.user.Username;
    post.UserId = req.user.id;

    // If an image is uploaded, save the file path
    if (req.file) {
        post.imageUrl = `/uploads/${req.file.filename}`;
    }

    try {
        const createdPost = await Posts.create(post);
        // Fetch the created post with all fields
        const fullPost = await Posts.findByPk(createdPost.id);
        res.json(fullPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});

// Fetch post by ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Posts.findByPk(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

// Update post title
router.put('/title', validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id: id } });
    res.json(newTitle);
});

// Update post text
router.put('/postText', validateToken, async (req, res) => {
    const { newText, id } = req.body;
    await Posts.update({ postText: newText }, { where: { id: id } });
    res.json(newText);
});

// Delete post
router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({ where: { id: postId } });
    res.json("DELETED SUCCESSFULLY!");
});

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: { UserId: id }, include: [Likes] });
    res.json(listOfPosts);
});

module.exports = router;
