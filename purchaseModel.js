const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    purchaseDate: { type: Date, default: Date.now },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
