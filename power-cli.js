#! /usr/bin/env node

//will tell shell environment which program it needs execute this, in our case it's node.
// always run your code in strict mode.

"use strict";

//require the enquirer module

const { MultiSelect } = require("enquirer");

console.log(`My first Node CLI app`);


const freqUsedBinaries = [
    "visual-studio-code",
    "google-chrome",
    "spotify",
    "node",
    "terminal"
];

// create a new multi select program

const multiSelectPrompt = new MultiSelect({
    name: "value",
    message: "Select all the binaries that you want to install ",
    choices: freqUsedBinaries
});

//run the prompt and handle the answer
multiSelectPrompt
    .run()
    .then(binaries => {
        console.log("Selected binaries:", binaries)
    })
    .catch(console.error);
