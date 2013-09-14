var path = require('path'),
  Twitchy = require(path.join(__dirname, '../','twitchy.js')),
  should = require('should');

describe('TwitchTV Library', function(){
	it('should export an object',function(){
		should.exist(Twitchy);
	});
	it('should be possible to initialize',function(){
		var client = new Twitchy();
		should.exist(client);
	});
  describe('OAuth2 service',function(done){
  it('should be possible to authenticate', function(done){
    var client  = new Twitchy().auth(function(err,access_token,refresh_token,results){
      should.not.exist(err);
      done();
    });
  });

  });
});
