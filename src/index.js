import * as dotenv from "dotenv";

import chickenSoupMaker from "./util/chickenSoup.js";
import instagramAPI from "./util/instagram.js";
import { designAndPaint } from "./util/artist.js";
import logger from "./util/logger.js";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ROLES = [
  "有智慧的長者",
  "得道的高僧",
  "嚴厲的老師",
  "有魅力的老闆",
  "心理學家",
  "Steve Jobs",
  "飽經風霜的老兵",
];

export default async function main() {
  try {
    if (!OPENAI_API_KEY) {
      logger.error("Please set OPENAI_API_KEY in .env");
      return;
    }
    logger.info("start to generate a post");
    const soupMaker = new chickenSoupMaker({
      apiKey: OPENAI_API_KEY,
      role: ROLES[3],
      roles: ROLES,
    });
    const soup = await soupMaker.feed(true);
    const caption = `${soup.text}\n${soup.hashtags.join("").toLowerCase()}`;

    const { description, image } = await designAndPaint(
      soup.hashtags.join(""),
      false
    );
    logger.info(`caption: ${caption}`);
    logger.info(`image: ${image}`);

    const container = await instagramAPI.createAndPublishPost(image, caption);

    logger.info(`post status: ${container.status_code}`);
  } catch (error) {
    logger.error(error, error.stack);
  }
}