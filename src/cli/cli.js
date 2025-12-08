import readline from 'readline';
import { TravelAgent } from '../core/travelAgent.js';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompt user for input
 * @param {string} prompt - The prompt to display
 * @returns {Promise<string>} - User's input
 */
function askQuestion(prompt) {
  return new Promise((resolve) => {
    readlineInterface.question(prompt, resolve);
  });
}

/**
 * Start the CLI chat interface
 */
export async function startCLI() {
  const agent = new TravelAgent();

  console.log('🌍 Travel Trip Planner Agent');
  console.log('Type "exit" to quit | "reset" to start over\n');

  while (true) {
    const userInput = await askQuestion('You: ');

    // Handle exit
    if (userInput.toLowerCase() === 'exit') {
      console.log('\n👋 Safe travels! Goodbye!\n');
      readlineInterface.close();
      break;
    }

    // Handle reset
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

