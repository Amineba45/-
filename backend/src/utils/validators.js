const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^(\+221|221)?[0-9]{9}$/;
  return re.test(phone.replace(/\s/g, ''));
};

const validateCoordinates = (lat, lng) => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

module.exports = { validateEmail, validatePhone, validateCoordinates };
