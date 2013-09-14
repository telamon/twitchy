var OAuth = require('oauth'),
  OAuth2 = OAuth.OAuth2,
  _ = require('underscore');
   
var twitchy = function(opts){
  opts = _.extend( {
    baseurl: 'http://api.justin.tv/oauth/',
    debug : true 
  }, opts || {});
  
  var oauth = new OAuth2( opts.key , opts.secret, opts.baseUrl, null ,'oauth2/token',null);


  // Auth function
  this.auth = function(callback){
    oauth.getOAuthAccessToken('',{
        'grant_type' : 'client_credentials'
      },
      callback
    );
    return this;
  }
};
module.exports= twitchy;


