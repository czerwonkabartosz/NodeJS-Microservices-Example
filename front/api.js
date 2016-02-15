var express = require('express');
var app = express();

var UsersServiceClient = require('./../services/users/users.client');
var PostsServiceClient = require('./../services/posts/posts.client');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/users', users);
app.get('/register', register);
app.get('/users/:id/posts', posts);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function users(req, res) {
    var usersService = UsersServiceClient();

    usersService.get(function (err, result) {
        res.send(result.body);
    });
}

function register(req, res) {
    var usersServiceClient = UsersServiceClient();

    var userDemo = {
        username: 'Demo'
    };

    usersServiceClient.register(userDemo, function (err, result) {
        res.send(result.body);
    });
}

function posts(req, res) {
    var userId = req.params.id;
    var postsService = PostsServiceClient();

    postsService.getPostsForUser(userId, function (err, result) {
        if (err) {
            return res.send('Error');
        }

        res.send(result.body);
    });
}