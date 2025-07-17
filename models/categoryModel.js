const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category required'],
        unique: [true, 'category must be unique'],
        minlength: [3, 'too short category'],
        maxlength: [32, 'too long category'],
    },
    slug: {
        type: String,
        lowercase: true,
    }
}, { timestamps: true });

    
const catModel = mongoose.model('Category', catSchema);

module.exports = catModel;