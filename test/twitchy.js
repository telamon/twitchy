var path = require('path'),
  Twitchy = require(path.join(__dirname, '../','twitchy.js')),
  should = require('should');

describe('TwitchTV Library', function(){
	it('should export an object',function(){
		should.exist(Twitchy);
	});
	it('should be possible to initialize',function(){
		client = new Twitchy();
		should.exist(client);
	});
});
