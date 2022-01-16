const mongoose = require('mongoose');

const componentsSchema = new mongoose.Schema(
    {
        manufacturer: { type: String, required: true, trim: true },
        model: { type: String, trim: true },
        price: { type: Number, required: true},
        img: { type: String, trim: true }
    },
    {
        timestamps: true
    }
);

const Component = mongoose.model('components', componentsSchema)
module.exports = Component