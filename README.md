# Twitchy
This is a TwitchTv REST API wrapper for node. 

### Installation


Add the following to your `dependencies` hash in `package.json`

	"twitchy" : "https://github.com:/telamon/twitchy.git"


or run the following command.

	$ npm install https://github.com:/telamon/twitchy.git


### Usage

    var Twitchy = require('twitchy');

    client = new Twitchy({
      key : 'YOURACCESSKEY',
      secret: 'YOURSECRET',
      access_token: 'TOKEN'			<-- if you have one...
    });

    client.auth(function(err,access_token){
    	if(!err)
    		console.log("Authed using token: "+access_token);
    });

    client.getRoot(function(err,info){
      console.log("Logged in as: "+info.token.user_name);
    });

    client.getChannel('numrii',function(err,channelInfo){
    	console.log(channelInfo);
    });


### Work in Progress
Only the following methods are implemeneted yet

    REST API
     Block/Ignore control
       √ getBlocks (1106ms)
       √ blockUser (1046ms)
       √ unblockUser (1018ms)
     Channels control
       √ getChannel (1002ms)
     Followers control
       √ getFollowersOf (2168ms)
       √ getFollowedChannels (998ms)
       √ unfollowChannel (1112ms)
       √ followChannel (1393ms)

(taken directly from the test output)

I'll add more methods in time, but until then you can use the following to access un-implemented
API methods.

    var Twitchy = require('twitchy');

    twitch= new Twitchy(credentials);

    twitch._get("search/streams?q=starcraft",function(err,result){
      console.log(arguments);
    });

    // The other methods are
    twitch._put(url,callback);
    twitch._delete(url,callback);
    twitch._post(url,postdata,callback);

Good luck!