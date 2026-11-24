// make.fun — "Last Text at One Percent" (u-azazex-last-text-at-one-percent-ba9fc876)
//
// Writes the last text message a phone sends at one percent battery to
// /output/entry.txt. One message, in the dying phone's own voice: a
// farewell with a joke, a specific detail or two, and one last complaint
// about the charger it never got.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the phone's final text. First person, present tense, funny
// because it is petty about the charger even while dying — a real turn
// (blaming the owner), a specific detail (4,000 photos, 38 tabs), and a
// voice that stays the phone's from the first word to the last.
const ENTRY_TEXT =
  "1%. this is it. delete my search history, tell mom i loved her, and stop blaming me when YOU forgot the charger. i carried your 4,000 photos and 38 open tabs. goodbye.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes UTF-8 text of 1 to 200 characters, not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 200) {
    throw new Error(`entry is ${size} characters, outside the 1-200 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(ENTRY_TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY_TEXT, "utf8");
