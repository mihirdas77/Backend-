// index.js

// Import the crypto module
const crypto = require('crypto');

// Get the command line arguments
const args = process.argv.slice(2);
const operation = args[0];
const numbers = args.slice(1).map(Number);

// Define functions for each operation
function add(numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function sub(numbers) {
    return numbers.reduce((acc, curr) => acc - curr);
}

function mult(numbers) {
    return numbers.reduce((acc, curr) => acc * curr, 1);
}

function divide(numbers) {
    return numbers.reduce((acc, curr) => acc / curr);
}

function sin(number) {
    return Math.sin(number);
}

function cos(number) {
    return Math.cos(number);
}

function tan(number) {
    return Math.tan(number);
}

function random(length) {
    return crypto.randomBytes(length).toString('binary');
}

// Check the operation and perform the appropriate calculation
switch (operation) {
    case 'add':
        console.log(add(numbers));
        break;
    case 'sub':
        console.log(sub(numbers));
        break;
    case 'mult':
        console.log(mult(numbers));
        break;
    case 'divide':
        if (numbers.includes(0)) {
            console.log("Division by zero is not allowed.");
        } else {
            console.log(divide(numbers));
        }
        break;
    case 'sin':
        if (numbers.length !== 1) {
            console.log("Please provide exactly one argument for sine calculation.");
        } else {
            console.log(sin(numbers[0]));
        }
        break;
    case 'cos':
        if (numbers.length !== 1) {
            console.log("Please provide exactly one argument for cosine calculation.");
        } else {
            console.log(cos(numbers[0]));
        }
        break;
    case 'tan':
        if (numbers.length !== 1) {
            console.log("Please provide exactly one argument for tangent calculation.");
        } else {
            console.log(tan(numbers[0]));
        }
        break;
    case 'random':
        if (numbers.length !== 1) {
            console.log("Provide length for random number generation.");
        } else {
            console.log(random(numbers[0]));
        }
        break;
    default:
        console.log("Invalid operation");
}

// To run the calculator, open your terminal, navigate to the directory where '1index.js' is located, and run commands like:
// bash

// Copy code
// node 1index.js add 10 5
// node 1index.js sub 20 7
// node 1index.js mult 3 4
// node 1index.js divide 15 3
// node 1index.js sin 30
// node 1index.js cos 45
// node 1index.js tan 60
// node 1index.js random 10
// node 1index.js random