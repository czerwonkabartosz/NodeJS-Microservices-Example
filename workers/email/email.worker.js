var kue = require('kue');

var config = require('../../config/development.json');

function EmailWorker() {
    if (!(this instanceof EmailWorker)) {
        return new EmailWorker();
    }

    var self = this;
}

EmailWorker.prototype.start = function () {

    var self = this;

    self.queue = kue.createQueue({
        redis: {
            port: config.redis.port,
            host: config.redis.host
        }
    });

    self.queue.process('email', self.email);
};

EmailWorker.prototype.email = function (job, done) {
    setTimeout(function () {
        console.log('Email sent!');
        done();
    }, 2000);
};

if (require.main === module) {
    main();
}

function main() {
    var worker = EmailWorker();
    worker.start();
}