var path = require('path'),
  Twitchy = require(path.join(__dirname, '../','twitchy.js')),
  should = require('should'),
  credentials = require(path.join(__dirname,'../','credentials.json'));

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
      should.exist(credentials);
      should.exist(credentials.key);
      should.exist(credentials.secret);
      var client  = new Twitchy(credentials).auth(function(err,access_token, refresh_token,result){
        console.log("AccessToken: "+access_token);
        should.not.exist(err);
        should.exist(access_token);
        done();
      });
    });
    it('should be possible to fetch a restricted resource',function(done){
      var client  = new Twitchy(credentials).auth();
      client.getChannel("numrii",function(err,res){
        should.not.exist(err);
        console.log(res);
        done();
      });
    });
  });

});
