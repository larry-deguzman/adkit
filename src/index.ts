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

function translation(num: number) {
  switch (num) {
    case 1:
      return "970x250";
    case 2:
      return "300x250";
    case 3:
      return "300x500";
    case 4:
      return "custom";
    default:
      return "unknown";
  }
}

async function main() {
  let customAdSize: string;

  console.log("Welcome to Adkit!");
  console.log("\n1. 970x250");
  console.log("2. 300x250");
  console.log("3. 300x500");
  console.log("4. Custom size");

  const adType = await ask(
    "Enter the ad type (970x250, 300x250, 300x500) or Custom (4): ",
  );
  const adClickTAG = await ask("Enter clickTAG URL: ");
  const backgroundColor = await ask(
    "Enter background color (e.g., #f1f5f9 or white): ",
  );
  const textColor = await ask("Enter text color (e.g., #1e293b or black): ");
  const borderColor = await ask("Enter border color (e.g., #e5e7eb or gray): ");
  // I want to build the ad based on the selected type. I will need to create a function that generates the ad.
  // build the index that will hold the add, so i need to have a component that generate the index.

  if (Number(adType) === 4) {
    const customWidth = await ask("Enter custom width: ");
    const customHeight: string = await ask("Enter custom height: ");
    customAdSize = `${customWidth}x${customHeight}`;
  }
  const adSize = () => {
    return customAdSize || translation(Number(adType));
  };

  const adObject: AdObject = {
    width: Number(adSize().split("x")[0]),
    height: Number(adSize().split("x")[1]),
    clickTAG: adClickTAG,
    backgroundColor,
    textColor,
    borderColor,
  };
  createAd(adObject);

  rl.close();
}

main();
