var TChannelJSON = require('tchannel/as/json');
var TChannel = require('tchannel');
var HyperbahnClient = require('tchannel/hyperbahn/');

var config = require('../../config/development.json');
var UserService = require('./../users/users.client');

var postsDb = {};

function PostsService() {
    if (!(this instanceof PostsService)) {
        return new PostsService();
    }

    var self = this;

    self.rootChannel = TChannel();
    self.subChannel = self.rootChannel.makeSubChannel({
        serviceName: 'PostsService'
    });
    self.serviceChannel = TChannelJSON({
        channel: self.subChannel
    });

    self.serviceChannel.register(self.subChannel, 'PostsService:getAllUsersForUser', self, self.get);

    self.hyperbahnClient = HyperbahnClient({
        tchannel: self.rootChannel,
        serviceName: 'PostsService',
        hostPortList: config.hyperbahn.seedList,
        hardFail: true
    });
}

PostsService.prototype.bootstrap = function bootstrap(callback) {
    var self = this;

    self.rootChannel.listen(0, '127.0.0.1', onListen);

    function onListen() {
        self.hyperbahnClient.once('advertised', callback);
        self.hyperbahnClient.advertise();
    }
};

PostsService.prototype.get = function get(app, req, head, body, callback) {
    var self = this;

    var userId = body.userId;

    var userService = UserService();

    userService.getUser(userId, function (err, body) {

        if (err) {
            return callback(err);
        }

        if(!body.body){
            return callback(new Error(''));
        }

        var userPosts = postsDb[userId];
        if (!userPosts) {
            postsDb[userId] = [];
        }

        postsDb[userId].push({title: 'Demo'});

        callback(null, {
            ok: true,
            body: postsDb[userId]
        });
    });
};

if (require.main === module) {
    main();
}

function main() {
    var app = PostsService();
    app.bootstrap(function onBootstrap() {
        console.log('Users Service running on port ' + app.rootChannel.address().port);
    });
}