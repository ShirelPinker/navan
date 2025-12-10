import * as readline from 'readline/promises';
import {TravelAi} from '../core/travelAi.js';

export async function startCLI() {
    const cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const agent = new TravelAi();

    console.log('🌍 Lets plan your next trip!');
    console.log('(Type "bye" to quit or "reset" to start over)\n');

    while (true) {
        const userInput = await cli.question('🌴 Traveler: ');

        if (userInput.toLowerCase() === 'bye') {
            console.log('\n👋 Safe travels! Goodbye!\n');
            cli.close();
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

