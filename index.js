import midjourney from "midjourney-client"
import * as dotenv from 'dotenv';

import chickenSoupMaker from './chickenSoup.js';
import instagramAPI from './instagram.js';
import artist from './artist.js';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ROLES = [
  '有智慧的長者',
  '得道的高僧',
  '嚴厲的老師',
  '有魅力的老闆',
  '心理學家',
  'Steve Jobs',
  '飽經風霜的老兵'
];

async function main() {
  const soupMaker = new chickenSoupMaker({
    apiKey: OPENAI_API_KEY,
    role: ROLES[3],
    roles: ROLES,
  });
  const soup = await soupMaker.feed(true);
  const caption = `${soup.text}\n${soup.hashtags.join('').toLowerCase()}`;
  
  const { description, image } = await artist.designAndPaint(null, true);

  console.log(image);
  
  const container = await instagramAPI.createAndPublishPost(image, caption);
  console.log(container);
}

main();