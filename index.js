'use strict';

/* Pre-load the images */
require('./src/images.js');

const optionDefinitions = [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'amount', alias: 'a', type: Number }
];

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);
const Logo = require('./src/logo.js');

/* Help flag */
function displayHelp() {
    console.log('Reddit Logo Procedrual Generation');
    console.log('August 2018 Contest Entry - Gavin Song');
    console.log('-----------------------------------');
    console.log('Flags:');
    console.log('--help              Display help message (alias: -h)');
    console.log('--amount <number>   Generate <number> logos (alias: -a)');
    console.log('');
    console.log('Output logos are in the output folder in the same folder as index.js');
    process.exit(1);
}

/* Input is invalid or help is requested */
if (Object.keys(options).length === 0 ||
        Number.isNaN(options.amount) ||
        options.help) {
    displayHelp();
}

/* Number is too big or small */
if (options.amount <= 0) {
    console.log('You must generate at least 1 logo');
    process.exit(1);
}
else if (options.amount > 10000) {
    console.log('You cannot generate more than 10,000 logos');
    process.exit(1);
}

/* Number is not integer */
if (options.amount != Math.floor(options.amount)) {
    console.log('Cannot generate a non-integer number of logos');
    process.exit(1);
}

console.log(`Generating ${options.amount} logos. Output located in /output folder...`);

/* Begin generating */
let previous = 0;

for (let i = 0; i < options.amount; i++) {
    new Logo();

    if (i / options.amount - previous >= options.amount * 0.05) {
        previous = i / options.amount;
        console.log(`${Math.round(i / options.amount * 100 * 1000) / 1000}% done`);
    }
}

console.log('Completed!');
