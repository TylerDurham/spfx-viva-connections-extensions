// check if the version numbber gets passed in
// the third option
if (process.argv.length !== 3) {
    console.log('ERROR: No version have been passed in.');
    process.exit(1);
}

// get the version passed in as argument
const nextVersion = process.argv[2]
    .split('-')[0]; // just in case of preminor, preemajor remove after third digit.

// require filesystem instanc
const fs = require('fs');

// define path to package-solution file
const solution = './config/package-solution.json';

// read package-solution file
const solutionFileContent = fs.readFileSync(solution, 'UTF-8');
// parse file as json
const solutionContents = JSON.parse(solutionFileContent);

// set property of version to next version
solutionContents.solution.version = nextVersion + ".0";

// Write version to solution package file.
fs.writeFileSync(
    solution,
    // convert file back to proper json
    JSON.stringify(solutionContents, null, 2),
    'UTF-8');

// Write version to module file for debugging.
fs.writeFileSync(
    "../src/common/version-info.ts", 
    `
    // This file is automatically generated from ./tools/pre-version.js
    // DO NOT MODIFY!
    export const version = { package: "${nextVersion}", solution: "${solutionContents.solution.version}" };`, 
    'UTF-8');
