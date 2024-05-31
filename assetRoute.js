const express = require('express');
const router = express.Router();
const Asset = require('./assetModel');
const authMiddleware = require('./middleware');

// Upload Asset
router.post('/upload', authMiddleware, async (req, res) => {
    try {
        const { title, description, price, fileUrl, thumbnailUrl } = req.body;
        const newAsset = new Asset({
            title,
            description,
            price,
            fileUrl,
            thumbnailUrl,
            seller: req.user.userId
        });
        await newAsset.save();
        res.status(201).json({ message: 'Asset uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Assets
router.get('/', async (req, res) => {
    try {
        const assets = await Asset.find().populate('seller', 'username');
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
