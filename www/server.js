var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('index.html');
});

app.listen(8080);
console.log('Listening on port 8080');

// var sys = require( "sys" );
// var http = require( "http" );

// var server = http.createServer(
// function( request, response ){
// 	response.writeHead( 200, {"content-type": "text/plain"} );
// 	response.write( "Hello world from AWS!\n" );
// 	response.end(); 
// }
// );

// server.listen(8080);

// sys.puts("server is running on 8080");
