var kue = require('kue');

var config = require('../../config/development.json');

function EmailClient() {
    if (!(this instanceof EmailClient)) {
        return new EmailClient();
    }

    var self = this;

    self.queue = kue.createQueue({
        redis: {
            port: config.redis.port,
            host: config.redis.host
        }
    });
}

EmailClient.prototype.sendEmail = function (email) {
    var self = this;

    self.queue.create('email', email).save();
};

module.exports = EmailClient;