var kue = require('kue');

function EmailClient() {
    if (!(this instanceof EmailClient)) {
        return new EmailClient();
    }

    var self = this;

    self.queue = kue.createQueue({
        redis: {
            port: 32768,
            host: '192.168.99.100'
        }
    });
}

EmailClient.prototype.sendEmail = function (email) {
    var self = this;

    self.queue.create('email', email).save();
};

module.exports = EmailClient;