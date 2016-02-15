var TChannelJSON = require('tchannel/as/json');
var TChannel = require('tchannel');
var HyperbahnClient = require('tchannel/hyperbahn/');

var config = require('../../config/development.json');

function PostsClient() {
    if (!(this instanceof PostsClient)) {
        return new PostsClient();
    }

    var self = this;

    self.rootChannel = TChannel();

    self.hyperbahnClient = HyperbahnClient({
        tchannel: self.rootChannel,
        serviceName: 'PostsClient',
        hostPortList: config.hyperbahn.seedList,
        hardFail: true
    });

    self.serviceChannel = TChannelJSON({
        channel: self.hyperbahnClient.getClientChannel({
            serviceName: 'PostsService'
        })
    });
}

PostsClient.prototype.getPostsForUser = function get(userId, cb) {
    var self = this;

    self.serviceChannel.request({
        serviceName: 'PostsService',
        timeout: 100,
        hasNoParent: true
    }).send('PostsService:getAllUsersForUser', null, {userId: userId}, cb);
};

module.exports = PostsClient;