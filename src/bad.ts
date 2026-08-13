import { exec } from 'child_process';

// Unused variable -> triggers @typescript-eslint/no-unused-vars
const unusedVariable = 42;

// 'any' type with no real justification -> flagged by ts recommended rules in strict setups
function processData(data: any) {
  return data.value;
}

// eval() usage -> triggers security/detect-eval-with-expression
function runUserCode(userInput: string) {
  return eval(userInput);
}

// Non-literal command execution -> triggers security/detect-child-process
function runCommand(userCommand: string) {
  exec(userCommand, (err, stdout) => {
    console.log(stdout);
  });
}

// Unsafe dynamically-built regex -> triggers security/detect-non-literal-regexp
function buildRegex(pattern: string) {
  return new RegExp(pattern);
}

export { processData, runUserCode, runCommand, buildRegex };
