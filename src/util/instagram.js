import {
  GetPageMediaRequest,
  PostPagePhotoMediaRequest,
  GetContainerRequest,
  PostPublishMediaRequest,
} from "instagram-graph-api";
import * as dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

async function getPosts() {
  const request = new GetPageMediaRequest(ACCESS_TOKEN, PAGE_ID);
  const { data } = await request.execute();
  return data;
}

async function createContainer(imageUrl, caption) {
  const request = new PostPagePhotoMediaRequest(
    ACCESS_TOKEN,
    PAGE_ID,
    imageUrl,
    caption
  );
  const { data } = await request.execute();
  return data;
}

async function getContainer(containerID) {
  const request = new GetContainerRequest(ACCESS_TOKEN, containerID);
  const { data } = await request.execute();
  return data;
}

async function publishContainer(containerID) {
  const request = new PostPublishMediaRequest(
    ACCESS_TOKEN,
    PAGE_ID,
    containerID
  );
  const { data } = await request.execute();
  return data;
}

async function createAndPublishPost(imageUrl, caption) {
  const { id } = await createContainer(imageUrl, caption);
  await publishContainer(id);
  const container = await getContainer(id);
  return container;
}

export default {
  getPosts,
  createAndPublishPost,
  publishContainer,
  getContainer,
  createContainer,
};
