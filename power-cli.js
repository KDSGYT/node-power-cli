#! /usr/bin/env node

//will tell shell environment which program it needs execute this, in our case it's node.
// always run your code in strict mode.

// "use strict";

//require the enquirer module

const { MultiSelect } = require("enquirer");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const freqUsedBinaries = [
    "visual-studio-code",
    "google-chrome",
    "spotify",
    "node",
    "apache2",
    "mysql-server",   
    "atom",
    "gimp",
    "inkspace",

];

// create a new multi select program

const multiSelectPrompt = new MultiSelect({
    name: "value",
    message: "Select all the binaries that you want to install ",
    choices: freqUsedBinaries
});


// define  aasync function
async function executeCommands(CommandLineString){
    const { stdout, stderr} = await exec(CommandLineString);
    console.log("Standard output:", stdout);
    console.log("Standard error:", stderr);
}



// create command line string

function getCommandLineString(binaries){
   return binaries
    .map(binary =>{
        let i=0;
        if(i==0){
            i++;
            return `sudo apt-get install build-essetial curl file git && brew cask install ${binary} && `;
        } else {
            return `brew cask install ${binary} && `;
        }
    }) 
    .join()
    .replace(/,/g," ")
    .slice(0,-3);
};


//run the prompt and handle the answer
multiSelectPrompt
    .run()
    .then(binaries => {
        console.log("Selected binaries:", binaries);
        console.log("Installing them all");
        executeCommands(getCommandLineString(binaries));
    })
    .catch(console.error);


