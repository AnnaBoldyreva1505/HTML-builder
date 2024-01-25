const fs = require('fs');
const path = require('path');
const readline = require('readline');

const exitPrompt = `Enter more text or exit (type 'exit' or press 'ctrl + c'): `;

const fileStream = fs.createWriteStream(
  path.join(__dirname, '02-write-file.txt'),
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleExit = () => {
  rl.question('Are you sure you want to exit? (y or n): ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      console.log('Goodbye!');
      process.exit();
    } else {
      rl.setPrompt(exitPrompt);
      rl.prompt();
    }
  });
};

rl.setPrompt(`Hello! Enter your text: `);
rl.prompt();

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    handleExit();
  } else {
    rl.setPrompt(exitPrompt);
    rl.prompt();
  }
});

rl.on('SIGINT', () => {
  handleExit();
});
