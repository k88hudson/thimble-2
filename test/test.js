var expect = require('expect.js');
var request = require('superagent');

describe('Suite one', function(){
 it (function(done){
   request.post('localhost:1989').end(function(res){
    expect(res).to.exist;
    expect(res.status).to.equal(200);
    done();
   });
  });
});
