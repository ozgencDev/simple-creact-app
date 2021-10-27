#!/usr/bin/env node

const { program } = require("commander");
const open = require("open");

const creact = require("./createProject");

program.description("Start a clean and simple React Project");
program.name("creact");
program.helpOption(false);
program.action(creact);

program.parse(process.argv);
