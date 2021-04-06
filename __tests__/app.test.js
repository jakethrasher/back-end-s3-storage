const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/s3.js',()=>{
  return {single:()=>(req,res,next)=>{
    req.file = {location:'https://my-first-bucket-cool.s3.us-west-2.amazonaws.com/94445dc1-d675-4ace-bb0d-83d7242ad352-image'}
  next()
 }}
})
  

describe('back-end-s3-storage routes', () => {
  beforeEach(() => {
    return setup(pool);
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
});
