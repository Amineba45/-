module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME || 'samba_service',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY || '7d',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || '30d'
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  orangeMoney: {
    apiKey: process.env.ORANGE_MONEY_API_KEY,
    merchantId: process.env.ORANGE_MONEY_MERCHANT_ID
  },
  wave: {
    apiKey: process.env.WAVE_API_KEY,
    merchantId: process.env.WAVE_MERCHANT_ID
  },
  email: {
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    from: process.env.EMAIL_FROM || 'noreply@sambaservice.com'
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
