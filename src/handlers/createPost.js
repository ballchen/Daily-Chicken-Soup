import post from '../index.js';

export async function run (event, context) {
  await post();
};

