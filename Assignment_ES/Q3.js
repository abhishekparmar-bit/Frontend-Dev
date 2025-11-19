"use strict";

const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

let validTransactions = [];
let invalidTransactions = [];

class NullTransactionError extends Error {
    constructor(message) {
        super(message);
        this.name = "NullTransactionError";
    }
}

class MissingPropertyError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingPropertyError";
    }
}

class NegativeAmountError extends Error {
    constructor(message) {
        super(message);
        this.name = "NegativeAmountError";
    }
}

function validateTransaction(tx) {
    // debugger;  (for breakpoint if needed)

    try {
        if (tx === null) {
            throw new NullTransactionError("Transaction entry is NULL");
        }

        if (!tx.hasOwnProperty("id") || !tx.hasOwnProperty("amount")) {
            throw new MissingPropertyError(
                `Missing required property in transaction: ${JSON.stringify(tx)}`
            );
        }

        if (tx.amount < 0) {
            throw new NegativeAmountError(
                `Amount cannot be negative (ID: ${tx.id})`
            );
        }

        validTransactions.push(tx);

    } catch (error) {
        invalidTransactions.push({
            transaction: tx,
            errorType: error.name,
            message: error.message
        });
    }
}

transactions.forEach(validateTransaction);

console.log("Valid Transactions:", validTransactions);
console.log("Invalid Transactions:", invalidTransactions);
console.log(`
Summary:
Successful: ${validTransactions.length}
Failed: ${invalidTransactions.length}
`);
