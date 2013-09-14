var OAuth = require('oauth'),
  OAuth2 = OAuth.OAuth2,
  _ = require('underscore'),
  http = require('http'),
  url = require('url'),
  request = require('superagent');

require('superagent-oauth')(request);
   
var twitchy = function(opts){
  opts = _.extend( {
    baseUrl: 'https://api.twitch.tv/kraken/',
    key: 'placeholder',
    secret: 'placeholder', 
    debug : true,
    httpPort : 4567
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
          scope: [
            'user_read',
            'user_blocks_edit',
            'user_blocks_read',
            'chat_login'
          ]          
        });
        res.writeHead(302, {'Location': authUrl,});
        res.end();
      }else if(req.url.match(/^\/\?code=/)){
        // We've got the code
        var code = req.url.match(/^\/\?code=([^&]+)(?:&|$)/)[1];        
        oauth.getOAuthAccessToken(code,{
            'grant_type' : 'authorization_code',
             scope: [
              'user_read',
              'user_blocks_edit',
              'user_blocks_read',
              'chat_login'
             ],
             redirect_uri: 'http://localhost:'+opts.httpPort,
          },
          function(err, access_token,refresh_token,result){
            if(!err){
              opts.access_token =access_token;
              opts.refresh_token =refresh_token;            
            }
            callback && callback(err, access_token,refresh_token,result);
          }
          
        );
        res.end("");
        //authSrv.close();
      }
    });
    authSrv.listen(opts.httpPort);
    console.log("Now open your browser and point it to: http://localhost:4567");
    return this;
  }

  _get = function(url){
    return request(opts.baseUrl+url).sign(oauth, opts.access_token, opts.secret);
  };
  /////////////
  /// API Calls
  /////////////

  this.getChannel=function(name,cb){
    _get("channels/"+name).end(function(err,res){cb && cb(err, res.body)});
  };



};
module.exports= twitchy;


