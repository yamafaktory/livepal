'use strict';

// Koa
var koaStatic = require('koa-static');
var app = require('koa')();

// Set static folders
app.use(koaStatic(__dirname + './../app/build'));
app.use(koaStatic(__dirname + './../app/build/bower_components'));

// Error management
app.on('error', function (err, ctx){
  log.error('server error', err, ctx);
});

// Set listening port
app.listen(1337);
