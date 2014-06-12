var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, My-Custom-Header');
    
    next();
};

app.configure(function () {
  app.use(allowCrossDomain);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var token = {
  "id" : "9c71ed5e2c0422606fa7dd45bc332ff0",
  "access_token" : "aI5zhxyD1GhUCt3-N-5EFFPiQNu0Sdh1BG3LkrcwHQA",
  "expires_in" : 9223372036854775,
  "token_type" : "Bearer"
}

app.get('/cors-no-preflight-with-header', function(req, res){
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, My-Custom-Header');
  res.header('My-Custom-Header', 'headervalue')
  res.send(token);
});

app.get('/cors-no-preflight-without-header', function(req, res){
  res.header('My-Custom-Header', 'headervalue')
  res.send(token);
});

app.put('/cors-preflight-with-header', function(req, res){
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, My-Custom-Header');
  res.header('My-Custom-Header', 'headervalue');
  res.send(token);
});

app.options('/cors-preflight-with-header', function(req, res){
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, My-Custom-Header');
  res.send(200);
});

app.put('/cors-preflight-without-header', function(req, res){
  res.header('My-Custom-Header', 'headervalue');
  res.send(token);
});

app.options('/cors-preflight-without-header', function(req, res){
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, My-Custom-Header');
  res.send(200);
});


app.listen(2222);
