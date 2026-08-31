// security-test.ts
// Sample file with intentional patterns that eslint-plugin-security's
// recommended rules should flag. Use this to verify your local pre-commit
// hook / eslint.config.js catches security issues before committing.
//
// Run: npx eslint security-test.ts
// (then delete this file — it's for testing only)
import { exec } from 'child_process';
import fs from 'fs';
import crypto from 'crypto';

// --- security/detect-object-injection ---
function getValue(obj: Record<string, unknown>, key: string) {
  return obj[key]; // dynamic property access — flagged
}

// --- security/detect-non-literal-fs-filename ---
function readUserFile(userPath: string) {
  return fs.readFileSync(userPath, 'utf8'); // non-literal path — flagged
}

// --- security/detect-child-process ---
function runCommand(userInput: string) {
  exec(`ls ${userInput}`); // shell exec with interpolated input — flagged
}

// --- security/detect-non-literal-regexp ---
function buildRegex(pattern: string) {
  return new RegExp(pattern); // regex from variable — flagged
}

// --- security/detect-unsafe-regex ---
const unsafeRegex = /^(a+)+$/; // catastrophic backtracking pattern — flagged

// --- security/detect-pseudoRandomBytes ---
function weakRandom() {
  return crypto.pseudoRandomBytes(16); // insecure randomness — flagged
}

// --- security/detect-eval-with-expression ---
function dangerousEval(code: string) {
  // eslint-disable-next-line no-eval
  return eval(code); // eval with variable — flagged
}

// --- security/detect-buffer-noassert ---
function unsafeBufferRead(buf: Buffer) {
  return buf.readUInt8(0, true); // noAssert=true — flagged
}

export {
  getValue,
  readUserFile,
  runCommand,
  buildRegex,
  unsafeRegex,
  weakRandom,
  dangerousEval,
  unsafeBufferRead,
};
