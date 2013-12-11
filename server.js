var express = require("express");
var app = express();

app.configure(function(){
  app.use(express.static(__dirname + '/'));
});

app.get('/editor', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/', function(req, res) {
  res.send('💭💻😎');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});