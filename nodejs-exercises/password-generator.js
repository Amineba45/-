const generator = require('generate-password');

function generateRandomPassword() {
  const generatedPassword = generator.generate({
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });

  console.log('Password generated successfully.');
  return generatedPassword;
}

generateRandomPassword();
