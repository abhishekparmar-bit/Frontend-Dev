"use strict";

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];

const clean = [];
const invalid = [];
const minors = [];
const adults = [];

function processRawData(data) {
  data.forEach((line, idx) => {
    const lineNo = idx + 1;
    try {
    
      const parsed = JSON.parse(line);

      if (!parsed.hasOwnProperty("user") || !parsed.hasOwnProperty("age")) {
        throw new Error("Missing required key(s): " + [
          parsed.hasOwnProperty("user") ? null : "user",
          parsed.hasOwnProperty("age") ? null : "age"
        ].filter(Boolean).join(", "));
      }

      const ageNum = Number(parsed.age);
      if (!Number.isFinite(ageNum)) {
        throw new Error("Invalid age value (not a number)");
      }

      const entry = { user: String(parsed.user), age: ageNum };
      clean.push(entry);

      if (ageNum < 18) minors.push(entry);
      else adults.push(entry);

      

      console.log(`Line ${lineNo}: Parsed OK → user="${entry.user}", age=${entry.age}`);

    } catch (err) {
      invalid.push({ line: lineNo, raw: line, error: err.message });

      console.log(`Line ${lineNo}: Error → ${err.message}`);
    }
  });
}

processRawData(rawData);

console.log("\n=== Final Report ===");
console.log(`Total lines processed : ${rawData.length}`);
console.log(`Valid entries         : ${clean.length}`);
console.log(`Invalid entries       : ${invalid.length}`);
console.log(`Adults (>=18)         : ${adults.length}`);
console.log(`Minors (<18)          : ${minors.length}`);

console.log("\nValid entries array:", clean);
console.log("\nInvalid entries array:", invalid);
console.log("\nAdults array:", adults);
console.log("\nMinors array:", minors);
