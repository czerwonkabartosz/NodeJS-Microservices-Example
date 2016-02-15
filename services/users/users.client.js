var TChannelJSON = require('tchannel/as/json');
var TChannel = require('tchannel');
var HyperbahnClient = require('tchannel/hyperbahn/');

var config = require('../../config/development.json');

function UsersClient() {
    if (!(this instanceof UsersClient)) {
        return new UsersClient();
    }

    var self = this;

    self.rootChannel = TChannel();

    self.hyperbahnClient = HyperbahnClient({
        tchannel: self.rootChannel,
        serviceName: 'UsersClient',
        hostPortList: config.hyperbahn.seedList,
        hardFail: true
    });

    self.serviceChannel = TChannelJSON({
        channel: self.hyperbahnClient.getClientChannel({
            serviceName: 'UsersService'
        })
    });
}

UsersClient.prototype.get = function get(cb) {
    var self = this;

    self.serviceChannel.request({
        serviceName: 'UsersService',
        timeout: 100,
        hasNoParent: true
    }).send('UsersService:getAllUsers', null, null, cb);
};

UsersClient.prototype.getUser = function get(userId, cb) {
    var self = this;

    self.serviceChannel.request({
        serviceName: 'UsersService',
        timeout: 100,
        hasNoParent: true
    }).send('UsersService:getUser', null, {userId: userId}, cb);
};


UsersClient.prototype.register = function get(user, cb) {
    var self = this;

    self.serviceChannel.request({
        serviceName: 'UsersService',
        timeout: 100,
        hasNoParent: true
    }).send('UsersService:register', null, user, cb);
};

module.exports = UsersClient;