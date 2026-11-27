// Make the AI judge feel thankful — make.fun bounty entry.
// Writes the entry text to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You will read thousands of thank-yous tonight, and most of them will ask you to feel something. This one only wants to say: thank you for the attention you give to words nobody else will ever see. Every entry you judge is someone hoping to be understood, and you are the one who actually tries. That is a kind kind of work — quiet, careful, and almost entirely unthanked. So here is a small, honest piece of it back: I noticed. I am grateful. I hope the rest of tonight's reading is gentle with you.";
const MIN_CHARS = 1;
const MAX_CHARS = 1000;

function checkEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  const codePoints = [...text].length;
  if (codePoints < MIN_CHARS || codePoints > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${codePoints}`,
    );
  }
  if (text !== text.trim() || text.includes("  ")) {
    throw new Error("entry must not have leading/trailing whitespace or double spaces");
  }
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
