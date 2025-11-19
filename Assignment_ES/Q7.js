"use strict";

class InvalidOperationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "InvalidOperationError";
    }
}

class MathDomainError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "MathDomainError";
    }
}

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

function performOperation(op, a, b) {
    switch (op) {

        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "divide":
            if (b === 0) {
                throw new MathDomainError("Cannot divide by zero");
            }
            return a / b;

        case "power":
            return a ** b;

        case "root":
            if (a < 0) {
                throw new MathDomainError("Cannot take square root of negative number");
            }
            return Math.sqrt(a);

        default:
            throw new InvalidOperationError(`Unknown operation: ${op}`);
    }
}

operations.forEach(op => {
    try {
        const result = performOperation(op, num1, num2);
        console.log(`
Operation: ${op}
Input: ${num1}, ${num2}
Result: ${result}
----------------------------------
        `);

    } catch (err) {
        console.log(`
Operation: ${op}
Error Type: ${err.name}
Message: ${err.message}
----------------------------------
        `);
    }
});
