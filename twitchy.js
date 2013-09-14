var OAuth = require('oauth'),
  oauth2 = OAuth.OAuth2,
  _ = require('underscore');
   
var twitchy = function(opts){
 opts || (opts = {});
 _.extend(opts, {
  baseurl: ''
  
 });
};
module.exports= twitchy;


