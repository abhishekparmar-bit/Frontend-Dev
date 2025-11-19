const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];


let validNumbers = [];
let invalidNumbers = [];

function isValidNumber(val) {
    const num = Number(val);
    return !isNaN(num) && val !== " " && val !== "" && !/px$/i.test(val);
}

console.log("=== Detailed Data Report ===\n");

apiData.forEach((item, index) => {
    let num = Number(item);
    let bool = Boolean(item);
    let str = String(item);

    console.log(`Item ${index + 1}:`, item);
    console.log("  Number  ->", num);
    console.log("  Boolean ->", bool);
    console.log("  String  ->", `"${str}"`);

    // Handle valid vs invalid numeric values
    if (isValidNumber(item)) {
        validNumbers.push(num);
    } else if (isNaN(num)) {
        invalidNumbers.push(item);
    }

    console.log("-------------------------------");
});

console.log("\n=== Summary ===");
console.log("Valid numeric values:", validNumbers);
console.log("Invalid numeric values:", invalidNumbers);
0