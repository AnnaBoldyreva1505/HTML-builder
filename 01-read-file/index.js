const fs = require('fs');
const path = require('path');

const fileReadStream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);

fileReadStream.on('data', (chunk) => {
  console.log(chunk);
});

fileReadStream.on('end', () => {
  console.log('End');
});

fileReadStream.on('error', (error) => {
  console.error('Error:', error);
});
