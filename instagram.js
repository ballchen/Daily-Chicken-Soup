import { GetPageMediaRequest, GetPageMediaResponse, PageOption, PostPagePhotoMediaRequest, GetContainerRequest, PostPublishMediaRequest } from 'instagram-graph-api';
import * as dotenv from 'dotenv'

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

async function getPosts() {
  const request = new GetPageMediaRequest(ACCESS_TOKEN, PAGE_ID);
  let res = await request.execute();
  return res.data;
}

async function createContainer(imageUrl, caption) {
  const request = new PostPagePhotoMediaRequest(ACCESS_TOKEN, PAGE_ID, imageUrl, caption);
  const res = await request.execute();
  return res.data;
}

async function getContainer(containerID) {
  const request = new GetContainerRequest(ACCESS_TOKEN, containerID);
  const res = await request.execute();
  return res.data;
}

async function publishContainer(containerID) {
  const request = new PostPublishMediaRequest(ACCESS_TOKEN, PAGE_ID, containerID);
  const res = await request.execute();
  return res.data;
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
}