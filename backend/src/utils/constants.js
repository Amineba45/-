module.exports = {
  USER_ROLES: ['customer', 'store_admin', 'super_admin'],
  ORDER_STATUS: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
  PAYMENT_METHODS: ['orange_money', 'wave', 'cod'],
  PAYMENT_STATUS: ['pending', 'completed', 'failed'],
  STORE_STATUS: ['active', 'inactive', 'suspended'],
  PRODUCT_UNITS: ['kg', 'litre', 'piece', 'gram', 'ml', 'pack'],
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  INITIAL_STORES: [
    {
      name: 'SAMBA BA - Keur Massar',
      address: 'À côté du pont, devant la pharmacie, Keur Massar',
      latitude: 14.7729,
      longitude: -17.3236
    },
    {
      name: 'SAMBA BA - Almadies 2',
      address: 'Almadies 2, Dakar',
      latitude: 14.7455,
      longitude: -17.5093
    },
    {
      name: 'Supérette Rahmatoulah',
      address: 'Devant la Gendarmerie du Keur Massar',
      latitude: 14.7735,
      longitude: -17.3210
    },
    {
      name: 'SUPERETTE ISB SAMBA BA',
      address: 'Route du Tivaouane Peulh, devant l\'église',
      latitude: 14.8012,
      longitude: -17.2856
    }
  ]
};
