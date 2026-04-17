const fs = require('fs');
const path = require('path');

const welcomePath = path.join(__dirname, 'welcome.txt');
const helloPath = path.join(__dirname, 'hello.txt');

fs.writeFile(welcomePath, 'Hello Node\n', (writeErr) => {
  if (writeErr) {
    console.error('Failed to create welcome.txt:', writeErr);
    return;
  }

  console.log('welcome.txt created successfully.');

  fs.readFile(helloPath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error('Failed to read hello.txt:', readErr);
      return;
    }

    console.log(data);
  });
});
