//run socket.io
var app = require('express')();
var express = require('express');
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./db/db.js');
var gsm = require('./osmonitb/osmonitb.js');
var mcc = require('./mccmnc/mcc-mnc-table.json')

//run shell script
var exec = require('child_process').exec;

app.use(express.json());
app.use(cors())

app.get('/subscribers', function(req, res){
  db.getSubscribers().then((result) => {
    // console.log(result)  ;
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
app.post('/subscribers/:id/sms', (req, res) => {
  console.log(req.body.sms);
  if(req.body.sms==""){
    res.status(500).send('Sms was empty');
  }
  else{
    gsm.sendSms(req.params.id,req.body.sms)
  }
    res.send("sms sent: "+req.body.sms);
})
app.post('/operators', (req, res) => {
  console.log(req.body.country)
  var arr= mcc.filter(d => d.countryCode ==req.body.country && d.status =="Operational")
  res.send(arr);
})
const replace = require('replace-in-file');
const shell = require('shelljs');
app.post('/operator', (req, res) => {
  var r_mcc = new RegExp('.*country.*');
  var r_mnc = new RegExp('.*mobile.*');
  var r_name1 = new RegExp('.*short.*')
  var r_name2 = new RegExp('.*long.*')

  const mcc_options = {
    files: '../../openbsc.cfg',
    from: r_mcc,
    to: ' network country code '+req.body.mcc,
  };
  const mnc_options = {
    files: '../../openbsc.cfg',
    from: r_mnc,
    to: ' mobile network code '+req.body.mnc,
  };
  const name1_options = {
    files: '../../openbsc.cfg',
    from: r_name1,
    to: ' short name '+req.body.name,
  };
  const name2_options = {
    files: '../../openbsc.cfg',
    from: r_name2,
    to: ' long name '+req.body.name,
  };
  try {
    const c_mcc= replace.sync(mcc_options);
    const c_mnc= replace.sync(mnc_options);
    const c_name1= replace.sync(name1_options);
    const c_name2= replace.sync(name2_options);
  }
  catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send(error.Error());

  }
  try {

    shell.exec('./restart_nitb.sh')
    }
  catch (error) {
      console.error('Error occurred:', error);
    }
  res.status(200).send('Operator set sucessfull');
})
io.on('connection', function(socket){
  console.log('an user connected');
});
Tail = require('tail').Tail;
tail = new Tail("../../log");

tail.on("line", function(data) {
  io.emit("MESSAGE",data+"\n");
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
