var kue = require('kue');

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
            port: 32768,
            host: '192.168.99.100'
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