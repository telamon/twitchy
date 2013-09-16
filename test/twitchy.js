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
    it('getRoot() should return current authentication info',function(done){
      new Twitchy(credentials).auth()
      .getRoot(function(err,res){
        should.exist(res);
        should.exist(res.token);
        should.exist(res.token.user_name);
        should.exist(res._links);
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
        new Twitchy(credentials).auth().blockUser("telamohn","numrii",function(err,res){
          should.exist(res._id);
          done();
        });
      });
      it('unblockUser',function(done){
        new Twitchy(credentials).auth().unblockUser("telamohn","numrii",function(err,res){          
          if(err.statusCode === 404){ // Move this assertions to the library maybe?
            should.equal(JSON.parse(err.data).message,'Block does not exist');
          }else{
            err.should.have.property('statusCode',204);
          }
          done();
        });
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
          if(err){
            if(err.statusCode === 404){
              var data = JSON.parse(err.data);
              data.message.should.match(/is not following/);
            }else{
              err.should.have.property('statusCode',204);  
            }
          }
          done();
        });
      });  
      it('followChannel',function(done){
        new Twitchy(credentials).auth().followChannel("telamohn","numrii",function(err,res){
          //console.log(res);
          done(err);
        });
      });  

    });

  });
});
