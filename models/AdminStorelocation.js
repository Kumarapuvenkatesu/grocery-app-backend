const mongoose = require('mongoose');

const AdminStorelocationSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminRegistration',
        required: true
    },
    storeName: {
    type: String,
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  deliveryRadius: {
    type: Number,
    default: 5,
  },

  deliverySlabs: [
    {
      minDistance: Number,
      maxDistance: Number,
      fee: Number,
    },
  ],

}, { timestamps: true });

AdminStorelocationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("AdminStoreLocation", AdminStorelocationSchema);

