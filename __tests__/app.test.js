const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('back-end-s3-storage routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
