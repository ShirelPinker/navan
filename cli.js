import readline from 'readline';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readlineInterface.question('Enter your prompt: ', async (userInput) => {
  console.log('\n🤔 Thinking...\n');
  
  try {
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: userInput }]
    });
    
    // Extract and display the response
    const response = completion.choices[0].message.content;
    console.log('✨ Response:', response);
    console.log();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  readlineInterface.close();
});

