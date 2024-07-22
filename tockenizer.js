import { isBooleanFalse, isBooleanTrue, isNull, isNumber } from "./utility";

const tockenizer = (input) => {
  let current = 0;
  const tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "{") {
      tokens.push({ type: "BracesOpen", value: char });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "BracesClose", value: char });
      current++;
      continue;
    }

    if (char === "[") {
      tokens.push({ type: "BracketsOpen", value: char });
      current++;
      continue;
    }

    if (char === "]") {
      tokens.push({ type: "BracketsClose", value: char });
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({ type: "Colon", value: char });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "Comma", value: char });
      current++;
      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      current++;
      tokens.push({ type: "String", value });
      continue;
    }

    if (/[\d\w]/.test(char)) {
      let value = "";

      while (/[\d\w]/.test(char)) {
        value += char;
        char = input[++current];
        continue;
      }

      if (isNumber(value)) tokens.push({ type: "Number", value });
      else if (isBooleanTrue(value)) tokens.push({ type: "True", value });
      else if (isBooleanFalse(value)) tokens.push({ type: "False", value });
      else if (isNull(value)) tokens.push({ type: "Null", value });
      else throw new Error("Unexpected value: " + value);
    }

    if (/\s/.test(char)) {
      current++;
      continue;
    }

    throw new Error("Unexpected character: " + char);
  }

  return tokens;
};
