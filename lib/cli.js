#!/usr/bin/env node

import { Command } from 'commander';

import { writePrimerCssFile } from '../src/github/utils/primer.js';
import { generateFixtures } from '../src/github/utils/fixtures.js';

const program = new Command();

program.command('generate-vars-primer')
  .description('Generate CSS variables for Primer themes')
  .action(() => {
    writePrimerCssFile();
  });

program.command('generate-fixtures-github')
  .description('Generate fixtures for GitHub repositories and users')
  .action(() => {
    generateFixtures();
  });

program.parseAsync();