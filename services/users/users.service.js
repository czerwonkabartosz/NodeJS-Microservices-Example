var TChannelJSON = require('tchannel/as/json');
var TChannel = require('tchannel');
var HyperbahnClient = require('tchannel/hyperbahn/');

var EmailClient = require('./../../workers/email/email.client');

function UsersService() {
    if (!(this instanceof UsersService)) {
        return new UsersService();
    }

    var self = this;

    self.rootChannel = TChannel();
    self.subChannel = self.rootChannel.makeSubChannel({
        serviceName: 'UsersServiceClient'
    });
    self.serviceChannel = TChannelJSON({
        channel: self.subChannel
    });

    self.serviceChannel.register(self.subChannel, 'UsersServiceClient:getAllUsers', self, self.get);
    self.serviceChannel.register(self.subChannel, 'UsersServiceClient:register', self, self.register);

    self.hyperbahnClient = HyperbahnClient({
        tchannel: self.rootChannel,
        serviceName: 'UsersServiceClient',
        hostPortList: ['127.0.0.1:21301'],
        hardFail: true
    });

    self.emailClient = EmailClient();

    self.usersDb = [];
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
        body: self.usersDb
    });
};

UsersService.prototype.register = function register(app, req, head, body, callback){
    var self = this;

    var emailClient = EmailClient();
    emailClient.sendEmail({to: 'demo@example.com'});

    if(!self.usersDb){
        self.usersDb = [];
    }

    self.usersDb.push(body);

    callback(null, {
        ok: true,
        body: self.usersDb
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