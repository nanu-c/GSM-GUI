//run socket.io
var app = require('express')();
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./db/db.js');

//run shell script
var sys = require('sys')
var exec = require('child_process').exec;
// var a = db.getSubscribers();
app.use(cors())

app.get('/subscribers', function(req, res){
  db.getSubscribers().then((result) => {
    console.log(result);
    res.send(result);
  });
  // res.sendFile('./index.html');
});
app.get('/subscribers', function(req, res){
  db.getSubscribers().then((result) => {
    console.log(result);
    res.send(result);
  });
  // res.sendFile('./index.html');
});
app.put('/subscribers/:id/activate', (req, res) => {
  // console.log(req.params.id);
  db.activateSubscriber(req.params.id).then((result) => {
    console.log(result);
    res.send(result);
  });
})
io.on('connection', function(socket){

//Mesage
    socket.on('Cmessage', function(msg){
    io.emit('Cmessage', msg);
    console.log('message: ' + msg);
//Mesage shell script
	function puts(error, stdout, stderr) {sys.puts(stdout)}
    exec("./helloworld.sh", puts);
  });


//TRX
    socket.on('TurnOnTRX', function(msg){
    io.emit('TurnOnTRX', msg);
    console.log('TRX: ON');
//TRX shell script
	function puts(error, stdout, stderr) {sys.puts(stdout)}
    exec("./TurnOnTRX.sh", puts);
  });


//BTS
    socket.on('TurnOnBTS', function(msg){
    io.emit('TurnOnBTS', msg);
    console.log("BTS is On");
//BTS shell script
    function puts(error, stdout, stderr) {sys.puts(stdout)}
    exec("./TurnOnBTS.sh", puts)
});



//BSC
    socket.on('TurnOnBSC', function(msg){
    io.emit('TurnOnBSC', msg);
    console.log('BSC: ON');
//BSC shell script
  function puts(error, stdout, stderr) {sys.puts(stdout)}
    exec("./TurnOnBSC.sh", puts);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
