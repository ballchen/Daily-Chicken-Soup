import midjourney from "midjourney-client"
async function main() {
  let res = await midjourney(`Description:
  The image features a whimsical, imaginative world full of bright colors and intricate details. Silhouetted in the foreground, a carefree figure dances joyfully surrounded by randomly scattered objects, like books, music records, vintage RV camper and bottles dipped awkwardly positioned
  within paths forming a dance floor; non applicable intent appear throughout the clever illustration. grand gilt Mirror ball figures keep pace with musical beat at the centerpiece hovering presences suggests mythological or futuristic significance overseeing vibrant ambiance. Highly saturated against exploding sporadic hopeful overtone deeply adhering concept art style.
  
   Overall, the image embodies an atmosphere of positivity and freedom, inviting the viewer into a fantasy land where randomness reigns king but still meaning corresponds to question limit surrounding them, meticulously depicted, building optimistic perceptiveness through both the effortless vibe  and teasing playful stabs.`);
  console.log(res);
}



main();