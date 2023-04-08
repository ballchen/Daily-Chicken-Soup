import midjourney from "midjourney-client";

async function main() {
  const images = await midjourney(
    "a profile thumbnail of instagram account, content related to Chicken Soup for the Soul, "
  );
  console.log(images[0]);
}

main();
