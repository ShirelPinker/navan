import readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readlineInterface.question('Hey Whats your name? ', (userInput) => {
  console.log(`Oh hello ${userInput}! Nice to meet you!`);
  readlineInterface.close();
});

