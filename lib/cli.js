#!/usr/bin/env node

import { Command } from 'commander';

import { writeDevCssFile } from '../src/devto/utils/forem.js';
import { writePrimerCssFile } from '../src/github/utils/primer.js';
import { generateFixtures as genFixGitHub } from '../src/github/utils/fixtures.js';
import { generateFixtures as genFixDevTo } from '../src/devto/fixtures/utils.js';
import { generateDocs } from './jsdoc.js';

const program = new Command();

program.command('generate-vars-primer')
  .description('Generate CSS variables for Primer themes')
  .action(() => {
    writePrimerCssFile();
  });

program.command('generate-vars-devto')
  .description('Generate CSS variables for dev.to/forem')
  .action(() => {
    writeDevCssFile();
  });

program.command('generate-fixtures-github')
  .description('Generate fixtures for GitHub repositories and users')
  .action(() => {
    genFixGitHub();
  });

program.command('generate-fixtures-devto')
  .description('Generate fixtures for dev.to')
  .action(() => {
    genFixDevTo();
  });

program.command('generate-docs')
  .description('Generate README.md files from JSDoc comments')
  .action(() => {
    generateDocs();
  });

program.parseAsync();