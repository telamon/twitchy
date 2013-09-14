var OAuth = require('oauth'),
  OAuth2 = OAuth.OAuth2,
  _ = require('underscore'),
  http = require('http'),
  url = require('url'),
  request = require('superagent'),
  assert = require('assert');

require('superagent-oauth')(request);
   
var twitchy = function(opts){
  opts = _.extend( {
    baseUrl: 'https://api.twitch.tv/kraken/',
    key: 'placeholder',
    secret: 'placeholder', 
    debug : true,
    httpPort : 4567,
    scope : [
      // This list of scopes is just for testing reference
      // only request the ones you're going to use by passing them through options.
      'user_read',
      'user_blocks_edit',
      'user_blocks_read',      
      'user_follows_edit',
      'channel_read',
      'channel_editor',
      'channel_commercial',
      'channel_stream',
      'channel_subscriptions',
      'user_subscriptions',
      'channel_check_subscription',
      'chat_login'

    ]
  }, opts || {});
  
  var oauth = new OAuth2( 
    opts.key , opts.secret, opts.baseUrl,
    'oauth2/authorize',
    'oauth2/token',
    { 'Accept' : 'application/vnd.twitchtv.v2+json'}
  );


  // Auth function
  this.auth = function(callback){

    if(opts.access_token){
      // TODO: fix implementation of refreshtokens when an accesstoken age times out.
      callback && callback(null,opts.access_token);
      return this;
    }
    // Start a temporary webserver
    var authSrv = http.createServer(function(req,res){       
      if(req.url.match(/^\/$/)){
        // No code present, Redirect user to authentication url.
        var authUrl = oauth.getAuthorizeUrl({
          redirect_uri: 'http://localhost:'+opts.httpPort,
          response_type : 'code',
          scope: opts.scope.join(" ")         
        });
        res.writeHead(302, {'Location': authUrl,});        
        res.end();
        opts.debug && console.log("Redirected user to: "+authUrl);
      }else if(req.url.match(/^\/\?code=/)){
        // We've got the code
        var code = req.url.match(/^\/\?code=([^&]+)(?:&|$)/)[1];        
        oauth.getOAuthAccessToken(code,{
            'grant_type' : 'authorization_code',
             scope: opts.scope.join(" "),
             redirect_uri: 'http://localhost:'+opts.httpPort,             
          },
          function(err, access_token,refresh_token,result){
            if(!err){
              opts.access_token =access_token;
              opts.refresh_token =refresh_token;   
              console.log("Your Access Token is: "+ acces_token);
              console.log("save it somewhere safe.");
            }
            callback && callback(err, access_token,refresh_token,result);
          }
          
        );
        res.end("");
        authSrv.close();
      }
    });
    authSrv.listen(opts.httpPort);
    console.log("Now open your browser and point it to: http://localhost:4567");
    return this;
  }

  _get = function(url){
    return request.get(opts.baseUrl+url).sign(oauth, opts.access_token, opts.secret);
  };
  _put = function(url){
    return request.put(opts.baseUrl+url).sign(oauth, opts.access_token, opts.secret);
  };  
  _delete = function(url){
    return request.del(opts.baseUrl+url).sign(oauth, opts.access_token, opts.secret);
  };   


  //////////////////////
  /// API Calls 
  /// Reference: https://github.com/justintv/Twitch-API
  //////////////////////

  this.getBlocks=function(login,cb){
    _get("users/"+login+"/blocks").end(function(err,res){      
      assert.equal(res.status, 200, JSON.stringify(res.body));
      cb && cb(err, res.body)
    });
  };

  this.blockUser=function(user,target,cb){
    _put("users/"+user+"/blocks/"+target).end(function(err,res){
      assert.equal(res.status, 200, JSON.stringify(res.body));
      cb && cb(err, res.body);
    });
  };
  this.unblockUser=function(user,target,cb){
    _delete("users/"+user+"/blocks/"+target).end(function(err,res){
      assert.equal(res.status, 200, JSON.stringify(res.body));
      cb && cb(err, res.body);
    });
  };

  this.getChannel=function(name,cb){
    _get("channels/"+name).end(function(err,res){
      assert.equal(res.status, 200, JSON.stringify(res.body));
      cb && cb(err, res.body);
    });
  };


};
module.exports= twitchy;


