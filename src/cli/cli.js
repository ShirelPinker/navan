import * as readline from 'readline/promises';
import { TravelAi } from '../core/travelAi.js';

export async function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const agent = new TravelAi();

  console.log('Type "bye" to quit or "reset" to start over\n');
  console.log('🌍 Lets plan your next trip!');

  while (true) {
    const userInput = await rl.question('You: ');

    if (userInput.toLowerCase() === 'bye') {
      console.log('\n👋 Safe travels! Goodbye!\n');
      rl.close();
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

