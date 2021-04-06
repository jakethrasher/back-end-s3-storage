const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const FormData = require('form-data');
const fs = require('fs');
const { join } = require('path');
const { setUncaughtExceptionCaptureCallback } = require('process');

jest.mock('../lib/utils/s3.js',()=>{
  return {single:()=>(req,res,next)=>{
    req.file = {location:'hi'}
  next()
 }}
})
  

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
  
  const data = await request(app)
  .post('/api/v1/upload')
  .send(testBassist)
  
  expect(data.body).toEqual({
    id:expect.any(String),
    image:expect.any(String),
    fullName:'Larry Graham',
    associatedActs:'Sly and The Family Stone, Graham Central Station'
  })
})
