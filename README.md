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

    client.getChannel('numrii',function(err,channelInfo){
    	console.log(channelInfo);
    });



More work in progress...
