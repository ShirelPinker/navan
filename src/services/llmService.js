import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const DEFAULT_MODEL = 'gpt-4.1';

export async function sendMessage(messages) {
  const completion = await openai.chat.completions.create({
    DEFAULT_MODEL,
    messages
  });

  return completion.choices[0].message.content;
}

