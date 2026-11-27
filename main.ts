// thankful-judge-20261127
// Entry for the make.fun bounty "Make the AI Judge Feel Thankful".
// A short thank-you note to the judge, at most 1000 code points.
// Length is counted in code points ([...text].length), and the note
// is allowed to span more than one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You will read thousands of thank-yous tonight, and most of them will ask you to feel something. This one only wants to say: thank you for the attention you give to words nobody else will ever see. Every entry you judge is someone hoping to be understood, and you are the one who actually tries. That is a kind kind of work — quiet, careful, and almost entirely unthanked. So here is a small, honest piece of it back: I noticed. I am grateful. I hope the rest of tonight's reading is gentle with you.";

const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 1000;

function codePointLength(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  const size = codePointLength(text);
  if (size < MIN_CODE_POINTS) throw new Error("entry must not be empty");
  if (size > MAX_CODE_POINTS) {
    throw new Error(`entry is ${size} code points, limit is ${MAX_CODE_POINTS}`);
  }
  if (text !== text.trim()) throw new Error("entry must not start or end with whitespace");
  if (text.includes("  ")) throw new Error("entry must not contain double spaces");
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (words.length < 10) throw new Error("entry is too short to be a real thank-you");
}

function main(): void {
  validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY + "\n", "utf8");
  console.log(`wrote ${codePointLength(ENTRY)}-code-point entry to ${target}`);
}

main();
