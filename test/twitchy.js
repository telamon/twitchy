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
        //console.log("AccessToken: "+access_token);
        should.not.exist(err);
        should.exist(access_token);
        credentials.access_token = access_token; // Save it for the upcoming tests.
        done();
      });
    });

    it('should be possible to fetch a restricted resource',function(done){      
      var client = new Twitchy(credentials).auth();
      client.getBlocks("telamohn",function(err,json){
        should.exist(json.blocks);
        done(err);
      });
      


    });
  });

  describe('REST API',function(){
    describe("Block/Ignore control",function(){
      it('getBlocks',function(done){      
        new Twitchy(credentials).auth().getBlocks("telamohn",done);
      });
      it('blockUser',function(done){
        new Twitchy(credentials).auth().blockUser("telamohn","numrii",done);
      });
      it('unblockUser',function(done){
        new Twitchy(credentials).auth().unblockUser("telamohn","numrii",done);
      });
    });

    describe("Channels control",function(){
      it('getChannel',function(done){
        new Twitchy(credentials).auth().getChannel("numrii",done);
      });
    });

    describe("Followers control",function(){
      it('getFollowersOf',function(done){
        new Twitchy(credentials).auth().getFollowersOf("numrii",function(err,res){
          //console.log(res);
          done(err);
        });
      });

      it('getFollowedChannels',function(done){
        new Twitchy(credentials).auth().getFollowedChannels("telamohn",function(err,res){
          //console.log(res);
          done(err);
        });
      });      

      it('unfollowChannel',function(done){
        new Twitchy(credentials).auth().unfollowChannel("telamohn","numrii",function(err,res){
          console.log(res);
          done(err);
        });
      });  
      it('followChannel',function(done){
        new Twitchy(credentials).auth().followChannel("telamohn","numrii",function(err,res){
          console.log(res);
          done(err);
        });
      });  

    });

  });
});
