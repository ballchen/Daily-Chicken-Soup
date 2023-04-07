import { ChatGPTAPI } from 'chatgpt';
import midjourney from "midjourney-client";
import * as dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const LIMIT = 200;

async function designByChatAPI(idea) {
  const chatApi = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY,
    completionParams: {
      temperature: 1.5,
      top_p: 1,
    }
  });

  const question = `
    I want an image. You help me design this image and give me a image description.
    You decide all the details and choose random style.
    The answer I need is only the image description.
    The description can not be more than ${LIMIT} words.
    ${!!idea ? `The image should be related to the following ideas: ${idea}.` : ''}
  `;

  const res = await chatApi.sendMessage(question);
  return res.text;
}

async function paint(description) {
  if(!description) {
    return;
  }
  const images = await midjourney(description);
  return images[0];
}

async function designAndPaint(idea, usingChatAPI = false) {
  let description = `a random style of painting that makes your spirit feel positive and free that contains random object, highly detailed, concept art ,and should be related to the ideas: ${idea}`;
  
  if(usingChatAPI) {
    description = await designByChatAPI(idea);
  }
  
  const image = await paint(description);
  return {
    description,
    image,
  };
}

export default {
  designAndPaint,
  paint,
};