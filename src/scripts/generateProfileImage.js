import imageGenerator from "../util/image-generator";

async function main() {
  const images = await imageGenerator(
    "a profile thumbnail of instagram account, content related to Chicken Soup for the Soul, "
  );
  console.log(images[0]);
}

main();
