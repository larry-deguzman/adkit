import * as readline from "readline";
import { createAd } from "./utils/createAd.js";
import { AdObject } from "./types/AdTypes.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("Welcome to Adkit!");
  console.log("\n1. 970x250");
  console.log("2. 300x250");
  console.log("3. 300x500");

  const adType = await ask("Enter the ad type (970x250, 300x250, 300x500): ");
  // I want to build the ad based on the selected type. I will need to create a function that generates the ad.
  // build the index that will hold the add, so i need to have a component that generate the index.
  const adSize =
    adType === "1"
      ? "970x250"
      : adType === "2"
        ? "300x250"
        : adType === "3"
          ? "300x500"
          : "unknown";

  const adObject: AdObject = {
    size: adSize,
  };
  createAd(adObject);

  rl.close();
}

main();
