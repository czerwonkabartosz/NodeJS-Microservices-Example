var _ = require('lodash');
var TChannelJSON = require('tchannel/as/json');
var TChannel = require('tchannel');
var HyperbahnClient = require('tchannel/hyperbahn/');

var config = require('../../config/development.json');
var EmailClient = require('./../../workers/email/email.client');

var usersDb = [
    {
        id: 1,
        name: 'Demo-1'
    },
    {
        id: 2,
        name: 'Demo-2'
    },
    {
        id: 3,
        name: 'Demo-3'
    }
];

function UsersService() {
    if (!(this instanceof UsersService)) {
        return new UsersService();
    }

    var self = this;

    self.rootChannel = TChannel();
    self.subChannel = self.rootChannel.makeSubChannel({
        serviceName: 'UsersService'
    });
    self.serviceChannel = TChannelJSON({
        channel: self.subChannel
    });

    self.serviceChannel.register(self.subChannel, 'UsersService:getAllUsers', self, self.get);
    self.serviceChannel.register(self.subChannel, 'UsersService:getUser', self, self.getUser);
    self.serviceChannel.register(self.subChannel, 'UsersService:register', self, self.register);

    self.hyperbahnClient = HyperbahnClient({
        tchannel: self.rootChannel,
        serviceName: 'UsersService',
        hostPortList: config.hyperbahn.seedList,
        hardFail: true
    });

    self.emailClient = EmailClient();
}

UsersService.prototype.bootstrap = function bootstrap(callback) {
    var self = this;

    self.rootChannel.listen(0, '127.0.0.1', onListen);

    function onListen() {
        self.hyperbahnClient.once('advertised', callback);
        self.hyperbahnClient.advertise();
    }
};

UsersService.prototype.get = function get(app, req, head, body, callback) {
    var self = this;

    callback(null, {
        ok: true,
        body: usersDb
    });
};

UsersService.prototype.getUser = function get(app, req, head, body, callback) {
    var self = this;

    var userId = body.userId;

    if (!userId) {
        callback(new Error('This userId is required'));
    }

    var user = _.find(usersDb, function (u) {
        return u.id === +userId
    });

    if (!user) {
        return callback(new Error('User not found'));
    }

    callback(null, {
        ok: true,
        body: user
    });
};

UsersService.prototype.register = function register(app, req, head, body, callback) {
    var self = this;

    var emailClient = EmailClient();
    emailClient.sendEmail({to: 'demo@example.com'});

    var id = usersDb.length + 1;
    usersDb.push({
        id: id,
        name: 'Demo-' + id
    });

    callback(null, {
        ok: true,
        body: usersDb
    });
};

if (require.main === module) {
    main();
}

function main() {
    var app = UsersService();
    app.bootstrap(function onBootstrap() {
        console.log('Users Service running on port ' + app.rootChannel.address().port);
    });
}