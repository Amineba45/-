const Store = require('../models/Store');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getNearbyStores = async (lat, lng, radius = 10) => {
  const stores = await Store.find({ status: 'active' });
  return stores
    .map(store => ({
      ...store.toObject(),
      distance: Math.round(calculateDistance(lat, lng, store.latitude, store.longitude) * 10) / 10
    }))
    .filter(store => store.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
};

module.exports = { calculateDistance, getNearbyStores };
