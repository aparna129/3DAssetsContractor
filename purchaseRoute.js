const express = require('express');
const router = express.Router();
const Purchase = require('./purchaseModel');
const Asset = require('./assetModel');
const authMiddleware = require('./middleware');

// Purchase Asset
router.post('/purchase', authMiddleware, async (req, res) => {
    try {
        const { assetId } = req.body;
        const asset = await Asset.findById(assetId);
        if (!asset) return res.status(404).json({ message: 'Asset not found' });

        const newPurchase = new Purchase({
            buyer: req.user.userId,
            asset: assetId,
            price: asset.price
        });
        await newPurchase.save();
        res.status(201).json({ message: 'Asset purchased successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Purchases
router.get('/my-purchases', authMiddleware, async (req, res) => {
    try {
        const purchases = await Purchase.find({ buyer: req.user.userId }).populate('asset');
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
