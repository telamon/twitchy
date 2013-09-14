var OAuth = require('oauth'),
  OAuth2 = OAuth.OAuth2,
  _ = require('underscore'),
  http = require('http');
   
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
    // Start a temporary webserver
    var authSrv = http.createServer(function(req,res){ 
      debugger;
      // Redirect user to authentication url.
      var authUrl = oauth.getAuthorizeUrl({
        redirect_uri: 'http://localhost:'+opts.httpPort,
        response_type : 'code'
      });
      res.writeHead(302, {'Location': authUrl,});
      res.end();
    });
   
    authSrv.listen(opts.httpPort);
    
    console.log("Now open your browser and point it to: http://localhost:4567");


    /*oauth.getOAuthAccessToken('',{
        'grant_type' : 'authorization_code',
         scope: [
          'user_read',
          'user_blocks_edit',
          'user_blocks_read',
          'chat_login'
         ]
      },
      callback
    );*/
    return this;
  }
};
module.exports= twitchy;


