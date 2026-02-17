const mongoose = require('mongoose');
const Category_Enum=['veggies', 'fruits', 'dairy', 'meat', 'bakery', 'snacks', 'other'];
const Unit_Enum=['kg', 'litre', 'ml', 'g', 'unit'];
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    
    desc:{
        type: String,
        // required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: Category_Enum,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min:0
    },
    unit:{
        type: String,
        enum: Unit_Enum,
        required: true
    },
    image:{
        type: String,
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);