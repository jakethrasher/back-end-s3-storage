const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const FormData = require('form-data');
const fs = require('fs');
const { join } = require('path');

describe('back-end-s3-storage routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});

const testBassist = {
  image:'larry-graham.jpg',
  fullName:'Larry Graham',
  associatedActs:'Sly and The Family Stone, Graham Central Station'
}
it('creates a bassist profile', async()=>{
  
  const fd = new FormData();

  fd.append('image','image')
  fd.append('fullName', 'Larry Graham')
  fd.append('associatedActs','Sly and The Family Stone, Graham Central Station')

  const data = await request(app)
  .post('/api/v1/upload')
  .send(JSON.stringify(fd))
  console.log(data.body)
  expect(data.body).toEqual(testBassist)
})