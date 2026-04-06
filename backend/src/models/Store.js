const mongoose = require('mongoose');

const operatingHoursSchema = new mongoose.Schema({
  open: { type: String },
  close: { type: String },
  isClosed: { type: Boolean, default: false }
}, { _id: false });

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Store name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required']
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required']
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  logo: {
    type: String
  },
  coverImage: {
    type: String
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'inactive'
  },
  operatingHours: {
    monday: operatingHoursSchema,
    tuesday: operatingHoursSchema,
    wednesday: operatingHoursSchema,
    thursday: operatingHoursSchema,
    friday: operatingHoursSchema,
    saturday: operatingHoursSchema,
    sunday: operatingHoursSchema
  },
  deliveryRadius: {
    type: Number,
    default: 5
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  minOrderAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for geospatial queries
storeSchema.index({ latitude: 1, longitude: 1 });
storeSchema.index({ status: 1 });

module.exports = mongoose.model('Store', storeSchema);
