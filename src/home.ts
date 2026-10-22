#!/usr/bin/env node

import { createAd } from "./utils/createAd.js";
import type { AdObject } from "./types/AdTypes.js";

async function main() {
  const [{ Command }, { input, number }] = await Promise.all([
    import("commander"),
    import("@inquirer/prompts"),
  ]);
  const program = new Command();

  program
    .name("adkit")
    .description("A CLI for building HTML5 advertising creatives")
    .version("0.1.0");

  program
    .command("create")
    .description("Create an HTML5 ad creative")
    .action(async () => {
      console.log("\nLet's create your ad!\n");

      const width = await number({
        message: "Ad width in pixels:",
        default: 300,
        required: true,
        validate: (value) =>
          value !== undefined && Number.isInteger(value) && value > 0
            ? true
            : "Width must be a positive integer.",
      });

      const height = await number({
        message: "Ad height in pixels:",
        default: 250,
        required: true,
        validate: (value) =>
          value !== undefined && Number.isInteger(value) && value > 0
            ? true
            : "Height must be a positive integer.",
      });

      const clickTAG = await input({
        message: "Click-through URL:",
        validate: (value) => {
          try {
            const url = new URL(value);
            return ["http:", "https:"].includes(url.protocol)
              ? true
              : "Enter an HTTP or HTTPS URL.";
          } catch {
            return "Enter a valid URL.";
          }
        },
      });

      const backgroundColor = await input({
        message: "Background color (hex):",
        default: "#FFFFFF",
        validate: (value) =>
          /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
            ? true
            : "Enter a valid hex color, e.g. #FFFFFF.",
      });

      const textColor = await input({
        message: "Text color (hex):",
        default: "#222222",
        validate: (value) =>
          /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
            ? true
            : "Enter a valid hex color, e.g. #222222.",
      });

      const borderColor = await input({
        message: "Border color (hex):",
        default: "#CCCCCC",
        validate: (value) =>
          /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
            ? true
            : "Enter a valid hex color, e.g. #CCCCCC.",
      });

      const ad: AdObject = {
        width,
        height,
        clickTAG,
        backgroundColor,
        textColor,
        borderColor,
      };

      console.log("\nYour ad configuration:");
      console.log(JSON.stringify(ad, null, 2));

      await createAd(ad);
    });

  await program.parseAsync(process.argv);
}

main();
