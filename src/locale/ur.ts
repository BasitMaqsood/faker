/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '..';
import ur from '../locales/ur';
import en from '../locales/en';

const faker = new Faker({
  locale: 'ur',
  localeFallback: 'en',
  locales: {
    ur,
    en,
  },
});

export = faker;
