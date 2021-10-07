//removed "test": "echo \"Error: no test specified\" && exit 1" from webpack scripts
const { response } = require('express');
const apiController = require('../server/controllers/apiController');
const httpMocks = require('node-mocks-http');

//sections tha
describe('response from query to get topic', () =>{
  let req = httpMocks.createRequest({
    method: 'GET',
    url: 'api/getTopic/all',
    params: {
      topic: 'all'
    }
});
  let res = httpMocks.createResponse();
  
  beforeAll(() => {
    // req = {params: {topic: "all"}};
  });
  describe('make sure we don\'t get an empty row when we send a valid request', () => {
    //it are what each teast is doing
    it('should return an array of objects', () => {
      apiController.getTopic(req,res, () => res.locals);
      expect(Array.isArray(res.locals.topic)).toBe(true);
    });
  })
})
// console.log(res.locals.topic)
