const Order = require('../models/Order');
const Store = require('../models/Store');

const getOrderStats = async (storeId, period = 30) => {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - period);

  const query = { storeId, createdAt: { $gte: dateFrom } };

  const [totalOrders, revenue, statusBreakdown] = await Promise.all([
    Order.countDocuments(query),
    Order.aggregate([
      { $match: { ...query, paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$finalAmount' } } }
    ]),
    Order.aggregate([
      { $match: query },
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } }
    ])
  ]);

  return {
    totalOrders,
    revenue: revenue[0]?.total || 0,
    statusBreakdown: statusBreakdown.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {})
  };
};

module.exports = { getOrderStats };
