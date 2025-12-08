import readline from 'readline';
import { TravelAgent } from '../core/travelAgent.js';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function askQuestion(prompt) {
  return new Promise((resolve) => {
    readlineInterface.question(prompt, resolve);
  });
}


export async function startCLI() {
  const agent = new TravelAgent();

  console.log('Type "bye" to quit or "reset" to start over\n');
  console.log('🌍 Lets plan your next trip!');

  while (true) {
    const userInput = await askQuestion('You: ');

    if (userInput.toLowerCase() === 'bye') {
      console.log('\n👋 Safe travels! Goodbye!\n');
      readlineInterface.close();
      break;
    }

    if (userInput.toLowerCase() === 'reset') {
      agent.reset();
      console.log('\n🔄 Conversation reset. Let\'s start fresh!\n');
      continue;
    }

    console.log('\n✈️  Planning...\n');

    try {
      const response = await agent.chat(userInput);
      console.log('🗺️  Agent:', response);
      console.log();
    } catch (error) {
      console.error('❌ Error:', error.message);
      console.log();
    }
  }
}

